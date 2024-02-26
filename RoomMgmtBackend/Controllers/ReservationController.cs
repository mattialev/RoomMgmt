using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Formatter;

using Repositories;
using Models;

namespace Controllers;

[ApiController]
[Route("api/reservation")]
public class ReservationController : ODataController {
    private readonly ReservationRepository _reservationRepository;

    public ReservationController(ReservationRepository reservationRepository)
    {
        _reservationRepository = reservationRepository;
    }

    [HttpGet]
    [EnableQuery]
    public async Task<IActionResult> Get()
    {
        var reservations = await _reservationRepository.GetAllReservationsAsync();
        return Ok(reservations.AsQueryable());
    }

    [HttpGet("{reservationId}")]
    public async Task<IActionResult> Find(Guid reservationId)
    {
        var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId);

        if (reservation == null)
        {
            return NotFound();
        }

        return Ok(reservation);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Reservation reservation)
    {
        if (reservation == null)
        {
            return BadRequest();
        }

        if (_reservationRepository.GetOverlappingReservations(reservation).Any())
        {
            return BadRequest("La nuova prenotazione si sovrappone con una prenotazione esistente.");
        }

        await _reservationRepository.AddReservationAsync(reservation);
        return CreatedAtAction(nameof(Find), new { reservationId = reservation.ReservationID }, reservation);
    }
 
    [HttpPut("{reservationId}")]
    public async Task<IActionResult> Put(Guid reservationId, [FromBody] Reservation updatedReservation)
    {
        var existingReservation = await _reservationRepository.GetReservationByIdAsync(reservationId);

        if (existingReservation == null)
        {
            return NotFound();
        }

        existingReservation.StartDateTime = updatedReservation.StartDateTime;
        existingReservation.EndDateTime = updatedReservation.EndDateTime;
        existingReservation.ReservedRoom = updatedReservation.ReservedRoom;

        await _reservationRepository.UpdateReservationAsync(existingReservation);
        return NoContent();
    }

    [HttpDelete("{reservationId}")]
    public async Task<IActionResult> Delete(Guid reservationId)
    {
        var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId);

        if (reservation == null)
        {
            return NotFound();
        }

        await _reservationRepository.DeleteReservationAsync(reservationId);
        return NoContent();
    }
}