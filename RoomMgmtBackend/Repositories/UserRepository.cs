using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public class UserRepository
{
    private readonly DatabaseContext _dbContext;

    public UserRepository(DatabaseContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        return await _dbContext.Users.ToListAsync();
    }

    public async Task<User?> Find(Guid UID)
    {
        return await _dbContext.Users.FirstOrDefaultAsync(u => u.UserID == UID);
    }

    public async Task Insert(User user)
    {
        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(User user)
    {
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Delete(Guid UID)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserID == UID);
        if (user != null)
        {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
