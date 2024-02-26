import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from '../interfaces/IRoom';
import ODataFilterBuilder from 'odata-filter-builder';
import {HttpParams} from "@angular/common/http";
import { IReservation } from '../interfaces/IReservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5249/api/reservations';
  constructor(private http: HttpClient) { }

  getReservations(): Observable<IRoom> {
    return this.http.get<any>(this.apiUrl);
  }

  getRoomReservations(selectedRoomID: any): Observable<any> {
    let query = this.apiUrl + `?$filter=reservedRoom eq ${selectedRoomID}`
    console.log(query)
    return this.http.get<any>(query);
  }

  getReservationById(selectedReservationID: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${selectedReservationID}`);
  }

  postReservation(data: Partial<IReservation>) {
    return this.http.post<any>(this.apiUrl, data);
  }

  deleteReservation(selectedReservationID: any) {
    console.log("Delete srv " + selectedReservationID)
    return this.http.delete<any>(`${this.apiUrl}/${selectedReservationID}`);
  }

  getReservationsByUser(userID: any) {
    let query = this.apiUrl + `?$filter=reservationOwner eq ${userID}`
    console.log(query)
    return this.http.get<any>(query);
  }

}