import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5249/api/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  getUserLogin(username: string, password: string): Observable<any> {
    let query = this.apiUrl + `?$filter=Username eq '${username}' and Password eq '${password}'`
    console.log(query)
    return this.http.get<any>(query)
  }
}