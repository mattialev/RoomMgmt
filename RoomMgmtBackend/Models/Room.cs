namespace Models;

public class Room {
    public Guid RoomID { get; set;}
    public string RoomName { get; set;} = "";
    public int RoomCapacity { get; set; } = -1;
    public List<Reservation>? ReservationList { get; set; }

}