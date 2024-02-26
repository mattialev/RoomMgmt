namespace Models;

public class Reservation {
    public Guid ReservationID { get; set; }
    public Guid ReservationOwner { get; set; }
    public Guid ReservedRoom { get; set; }
    public DateTime StartDateTime { get; set; }
    public DateTime EndDateTime { get; set; }

}