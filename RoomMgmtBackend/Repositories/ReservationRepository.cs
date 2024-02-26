using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public class ReservationRepository
{
    private readonly DatabaseContext _dbContext;

    public ReservationRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Reservation>> GetAllReservationsAsync()
    {
        return await _dbContext.Reservations.ToListAsync();
    }

    public async Task<Reservation?> GetReservationByIdAsync(Guid UID)
    {
        return await _dbContext.Reservations.FirstOrDefaultAsync(r => r.ReservationID == UID);
    }

    public async Task AddReservationAsync(Reservation reservation)
    {
        await _dbContext.Reservations.AddAsync(reservation);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateReservationAsync(Reservation reservation)
    {
        _dbContext.Reservations.Update(reservation);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteReservationAsync(Guid UID)
    {
        var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.ReservationID == UID);
        if (reservation != null)
        {
            _dbContext.Reservations.Remove(reservation);
            await _dbContext.SaveChangesAsync();
        }
    }

    public IQueryable<Reservation?> GetOverlappingReservations(Reservation newReservation) {
        return _dbContext.Reservations
            .Where(r =>
                (r.StartDateTime < newReservation.EndDateTime && r.EndDateTime > newReservation.StartDateTime) ||
                (newReservation.StartDateTime < r.EndDateTime && newReservation.EndDateTime > r.StartDateTime)
            );
    }

}
