using Models.Enum;

namespace Models;

public class User {
    public Guid UserID { get; set; }
    public required string Username { get; set; }
    public string Name { get; set; } = "";
    public string Surname { get; set; } = "";
    public required string Password { get; set; }
    public AuthLevel AuthLevel { get; set;} = AuthLevel.User;
    public List<Reservation>? ReservationList { get; set; }
}