import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

  constructor(
    private userSrv : UserService
  ) {}

   isUserLoggedIn: boolean = false;

   login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Chiamata al servizio degli utenti per ottenere la lista degli utenti corrispondenti alle credenziali
      this.userSrv.getUserLogin(username, password).subscribe(
        (users) => {
          if (users && users.length > 0) {
            // Utente trovato, autenticazione riuscita
            this.isUserLoggedIn = true;
            localStorage.setItem('userId', users[0].userID);
            localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 
            observer.next(true);
          } else {
            // Nessun utente trovato con le credenziali fornite, autenticazione fallita
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          // Gestione degli errori, ad esempio nel caso di un errore di rete
          console.error('Errore durante il login:', error);
          observer.error(error);
        }
      );
    });
  }

   logout(): void {
   this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn'); 
      localStorage.removeItem('userId');
   }

}