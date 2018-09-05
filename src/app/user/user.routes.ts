import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';
import { ProfileRouteService } from './profile-route.service';

export const userRoutes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileRouteService] },
  { path: 'login', component: LoginComponent }
]