using Microsoft.EntityFrameworkCore;

namespace Models;

public class DatabaseContext : DbContext
{

    protected readonly IConfiguration Configuration;
    public DatabaseContext(IConfiguration configuration){
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
    }

    public DbSet<User> Users {get; set;}
    public DbSet<Room> Rooms {get; set;}
    public DbSet<Reservation> Reservations {get; set;}

    
}