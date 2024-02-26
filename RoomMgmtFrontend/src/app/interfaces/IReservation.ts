import { UUID } from "crypto";
import { IUser } from "./IUser";
import { IRoom } from "./IRoom";

export interface IReservation {
    reservationID: UUID;
    startDateTime: Date;
    endDateTime: Date;
    reservationOwner: any;
    reservedRoom: any;
}