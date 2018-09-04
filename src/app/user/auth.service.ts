import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  public currentUser: IUser;

  login(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      firstName: 'Kostya',
      lastName: 'Nekh',
      userName: 'koS'
    }
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  logOut() {
    this.currentUser = null;
  }
}