import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styles: [`
    em {float: right; padding-right: 10px; color: #E05C65}
  `]
})
export class LoginComponent {
  username: string;
  password: string;
  loginIsInvalid: boolean = false;
  mouseOnLoginButton: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  login(formValues) {
    this.authService.login(formValues.username, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginIsInvalid = true;
        } else {
          this.router.navigate(['/events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/events']);
  }
}