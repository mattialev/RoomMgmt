import { UUID } from "crypto";

export interface IRoom {
    roomID: UUID;
    roomName: string;
    roomCapacity: number;
}