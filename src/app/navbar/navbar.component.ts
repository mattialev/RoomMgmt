import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { filter } from 'rxjs';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  faHouse = faHouse
  public isLogged : boolean = false;
  public userId?: string | null;
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLogged = (localStorage.getItem("isUserLoggedIn") == "true");
      this.userId = localStorage.getItem("userId")
      console.log("User ID: " + this.userId)
    });
  }  
  
}
