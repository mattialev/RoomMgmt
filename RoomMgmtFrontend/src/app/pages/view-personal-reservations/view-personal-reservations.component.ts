import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReservationService } from '../../services/reservation.service';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-personal-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-personal-reservations.component.html',
  styleUrl: './view-personal-reservations.component.css'
})
export class ViewPersonalReservationsComponent implements OnInit {
  
  public userId: string = "";
  public fullName: string = "";
  public reservationList: any[] = [];
  public roomList = new Map<string, string>();
  
  constructor (
    private route: ActivatedRoute,
    private userSrv: UserService,
    private reservationSrv: ReservationService,
    private roomSrv: RoomService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(event => {
			this.userId = event['userID'];
			console.log("ROOM ID:")
		});

    this.userSrv.getUserById(this.userId).subscribe(data => {
      this.fullName = data['surname'] + " " + data['name']
    })

    this.reservationSrv.getReservationsByUser(this.userId).subscribe(data => {
      this.reservationList = data
      for (let data of this.reservationList) {
        this.roomSrv.getRoomById(data.reservedRoom).subscribe(room => {
          if (room) this.roomList.set(data.reservedRoom, room.roomName);
        })
      }
    })

    

  }

  public updateReservation() {
    
  }

  public deleteReservation(reservationId: any) {
    console.log("Delete")
    this.reservationSrv.deleteReservation(reservationId);
  }


}
