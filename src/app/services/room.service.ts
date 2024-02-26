import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from '../interfaces/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5249/api/rooms';
  constructor(private http: HttpClient) { }

  getRooms(): Observable<IRoom> {
    return this.http.get<any>(this.apiUrl);
  }

  getRoomById(selectedRoomID: any): Observable<IRoom> {
    return this.http.get<any>(`${this.apiUrl}/${selectedRoomID}`);
  }
}
