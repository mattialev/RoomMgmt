import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'app-login',
   standalone: true,
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
   imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

   userName!: string;
   password!: string;
   formData!: FormGroup;
   errorFlag: boolean = false;

   constructor(private authService : AuthService, private router : Router) { }

   ngOnInit() {
      this.formData = new FormGroup({
         userName: new FormControl("mattia.levratti"),
         password: new FormControl("aa"),
      });
   }

   onClickSubmit(data: any) {
      this.userName = data.userName;
      this.password = data.password;

      console.log("Login page: " + this.userName);
      console.log("Login page: " + this.password);

      this.authService.login(this.userName, this.password)
         .subscribe( data => { 
            console.log("Is Login Success: " + data); 
            switch (data) {
              case false:
                this.errorFlag = true;
                break;
            }
      
           if(data) this.router.navigate(['/addReservation']); 
      });
   }
}