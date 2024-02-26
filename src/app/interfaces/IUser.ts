import { UUID } from "crypto";
import { IReservation } from "./IReservation";

export interface IUser {
    userID: UUID;
    userName: string;
    name: string;
    surname: string;
    password: string;
    reservationList: IReservation[];
}