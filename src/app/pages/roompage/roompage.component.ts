import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { ReservationService } from '../../services/reservation.service';
import { UUID } from 'crypto';
import { IRoom } from '../../interfaces/IRoom';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
	selector: 'app-roompage',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './roompage.component.html',
	styleUrl: './roompage.component.css'
})
export class RoompageComponent implements OnInit {

	public selectedRoomID!: UUID;
	public selectedRoom!: IRoom;
	public reservationList!: any[];
	public ownerList = new Map<string, string>();

	constructor (
		private route: ActivatedRoute,
		private userSrv: UserService,
		private roomSrv: RoomService,
		private reservationSrv: ReservationService
	) {}

	async ngOnInit() {

		this.route.params.subscribe(event => {
			this.selectedRoomID = event['roomID'];
			console.log("*** ENTERING ROOM PAGE ***")
			console.log("ROOM ID: " + this.selectedRoomID)
		});
	
		forkJoin([
			this.roomSrv.getRoomById(this.selectedRoomID),
			this.reservationSrv.getRoomReservations(this.selectedRoomID)
		]).subscribe(([room, reservations]) => {
			if (room) {
				this.selectedRoom = room;
			}
	
			if (reservations) {
				this.reservationList = reservations;	
				this.processReservations();
			}
		});
	}
	
	private async processReservations() {
		for (var reservation of this.reservationList) {
			reservation.startDateTime = new Date(reservation.startDateTime);
			reservation.endDateTime = new Date(reservation.endDateTime);
			await this.getReservationOwner(reservation.reservationOwner);
		}
	}
	
	private async getReservationOwner(reservationId: UUID) {
		await this.userSrv.getUserById(reservationId).subscribe(data => {
			if (data) this.ownerList.set(data.userID, data.surname + " " + data.name);
		});
	}
}