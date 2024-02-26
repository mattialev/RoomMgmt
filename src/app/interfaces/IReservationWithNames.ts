import { UUID } from "crypto";

export interface IReservationWithNames {
    reservationID: UUID;
    startDateTime: Date;
    endDateTime: Date;
    
    reservationOwnerID: UUID;
    reservationOwnerName: string;
    reservationOwnerSurname: string;
    
    reservationRoomID: UUID;
    reservationRoomName: UUID;
    reservationRoomCapacity: number;
}