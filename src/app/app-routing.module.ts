import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { LoginComponent } from './login/login.component';
import { RoompageComponent } from './pages/roompage/roompage.component';

import { AddReservationGuard } from './add-reservation.guard';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ViewPersonalReservationsComponent } from './pages/view-personal-reservations/view-personal-reservations.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent, data: {title: "Homepage"} },
    { path: 'userpage', component: UserpageComponent, data: {title: "Userpage"} },
    { path: 'room/:roomID', component: RoompageComponent, data: {title: "Room detail"}},
    { path: 'login', component: LoginComponent, data: {title: 'Sign in'} },
    { path: 'addReservation', component: AddReservationComponent, data: {title: 'Add reservation'}, canActivate: [AddReservationGuard]},
    { path: 'logout', component: LogoutComponent },
    { path: 'userpage', component: UserpageComponent, data: {title: 'My reservations'}, canActivate: [AddReservationGuard]},
    { path: 'viewPersonalReservations/:userID', component: ViewPersonalReservationsComponent, data: {title: 'My reservations'}, canActivate: [AddReservationGuard]},
    { path: '**', pathMatch: 'full',  component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }