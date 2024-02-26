using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Formatter;

using Repositories;
using Models;

namespace Controllers;

[ApiController]
[Route("api/room")]
public class RoomController : ODataController {
    private readonly RoomRepository _roomRepository;

    public RoomController(RoomRepository roomRepository)
    {
        _roomRepository = roomRepository;
    }

    [HttpGet]
    [EnableQuery]
    public async Task<IEnumerable<Room>> Get()
    {
        var rooms = await _roomRepository.GetAllRoomsAsync();
        return rooms;
    }

    [HttpGet("{roomId}")]
    [EnableQuery]
    public async Task<IActionResult> Find(Guid roomId)
    {
        var room = await _roomRepository.GetRoomByIdAsync(roomId);

        if (room == null)
        {
            return NotFound();
        }

        return Ok(room);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Room room)
    {
        if (room == null)
        {
            return BadRequest();
        }

        await _roomRepository.AddRoomAsync(room);
        return CreatedAtAction(nameof(Find), new { roomId = room.RoomID }, room);
    }

    [HttpPut("{roomId}")]
    public async Task<IActionResult> Put(Guid roomId, [FromBody] Room updatedroom)
    {
        var existingRoom = await _roomRepository.GetRoomByIdAsync(roomId);

        if (existingRoom == null)
        {
            return NotFound();
        }

        existingRoom.RoomName = updatedroom.RoomName;
        existingRoom.RoomCapacity = updatedroom.RoomCapacity;

        await _roomRepository.UpdateRoomAsync(existingRoom);
        return NoContent();
    }

    [HttpDelete("{roomId}")]
    public async Task<IActionResult> Delete(Guid roomId)
    {
        var room = await _roomRepository.GetRoomByIdAsync(roomId);

        if (room == null)
        {
            return NotFound();
        }

        await _roomRepository.DeleteRoomAsync(roomId);
        return NoContent();
    }
}