import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class ProfileRouteService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate() {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate['/events'];
    }

    return isAuthenticated;
  }

}