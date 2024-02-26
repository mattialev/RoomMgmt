// add-reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct, NgbModule, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from '../../services/room.service'; // Assumi che tu abbia corretto il percorso al tuo servizio RoomService
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IRoom } from '../../interfaces/IRoom';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';
import { IReservation } from '../../interfaces/IReservation';
import { start } from 'repl';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  imports: [FormsModule, NgbModule, NgbDatepicker, CommonModule]
})
export class AddReservationComponent implements OnInit {
  rooms: any | undefined; // Assuming RoomService returns an array of room objects
  selectedRoomId: string = '';
  selectedDate!: NgbDateStruct;

  todayDate = new Date();
  startPlaceholder = { hour: new Date().getHours(), minute: new Date().getMinutes() };
  endPlaceholder = { hour: new Date().getHours()+1, minute: new Date().getMinutes() };

  constructor(
    private roomService: RoomService,
    private calendar: NgbCalendar,
    private reservationSrv: ReservationService
  ) { }

  ngOnInit(): void {
    this.loadRooms();
    this.selectedDate = this.calendar.getToday();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(data => {
      if (data) this.rooms = data;
      console.log(this.rooms);
    });
  }

  onSubmit(): void {
    console.log('Reservation submitted:', this.selectedRoomId, this.selectedDate, this.startPlaceholder, this.endPlaceholder);

    
    const startDate = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1, // Mese inizia da 0 in JavaScript
      this.selectedDate.day,
      this.startPlaceholder.hour,
      this.startPlaceholder.minute,
    );

    const endDate = new Date(
      this.selectedDate.year,
      this.selectedDate.month - 1,
      this.selectedDate.day,
      this.endPlaceholder.hour,
      this.endPlaceholder.minute,
    );
    

    let reservationToSend : Partial<IReservation> = {
      startDateTime: startDate,
      endDateTime: endDate,
      reservationOwner: localStorage.getItem('userId'),
      reservedRoom: this.selectedRoomId
    }
    console.log(reservationToSend)
    this.reservationSrv.postReservation(reservationToSend).subscribe(data => {
      console.log(data);
      (document.getElementById('feedback') as HTMLElement).innerHTML = "<div class=\"alert alert-success\" role=\"alert\">Room reservation inserted with success</div>";
    }, error => {
      switch (error.status) {
        case 400:
          (document.getElementById('feedback') as HTMLElement).innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">Reservation not inserted. Room is already booked for the requested time span!</div>";
          break;
        case 404:
          (document.getElementById('feedback') as HTMLElement).innerText = 'Errore: 404 Not Found';
          break;
        case 500:
          (document.getElementById('feedback') as HTMLElement).innerText = 'Errore 500 Server Error';
          break;
        default:
          (document.getElementById('feedback') as HTMLElement).innerText = 'Errore, looks like we are having some troubles';
      }
    })
  }
}
