using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public class RoomRepository
{
    private readonly DatabaseContext _dbContext;

    public RoomRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Room>> GetAllRoomsAsync()
    {
        return await _dbContext.Rooms.ToListAsync();
    }

    public async Task<Room?> GetRoomByIdAsync(Guid UID)
    {
        return await _dbContext.Rooms.FirstOrDefaultAsync(r => r.RoomID == UID);
    }

    public async Task AddRoomAsync(Room room)
    {
        await _dbContext.Rooms.AddAsync(room);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateRoomAsync(Room room)
    {
        _dbContext.Rooms.Update(room);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteRoomAsync(Guid UID)
    {
        var room = await _dbContext.Rooms.FirstOrDefaultAsync(r => r.RoomID == UID);
        if (room != null)
        {
            _dbContext.Rooms.Remove(room);
            await _dbContext.SaveChangesAsync();
        }
    }
}
