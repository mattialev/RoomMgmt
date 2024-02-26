import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IRoom } from '../../interfaces/IRoom';
import { RouterModule } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsersLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  faUsersLine = faUsersLine;

  public roomList: any;

  constructor (
    private roomSrvc: RoomService
  ) {}

  ngOnInit(): void {
    this.roomSrvc.getRooms().subscribe(data => {
      this.roomList = data;
    })
    console.log(this.roomList)
  }
}
