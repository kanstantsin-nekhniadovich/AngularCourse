import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TOASTR_TOKEN, IToastr } from '../common/toastr.service';

@Component({
  templateUrl: 'profile.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error input {background-color: #E3C3C5}
    .error ::-webkit-input-placeholder {color: #999}
    .error ::-moz-input-placeholder {color: #999}
    .error ::ms-input-placeholder {color: #999}
    .error :-moz-input-placeholder {color: #999}
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit() {
    this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  isValidateFirstNameField() {
    return this.firstName.valid || this.firstName.untouched;
  }

  isValidateLastNameField() {
    return this.lastName.valid || this.lastName.untouched;
  }

  updateUserProfile(profileValues) {
    this.authService.updateUserInfo(profileValues.firstName, profileValues.lastName)
      .subscribe(() => {
        this.toastr.success('Profile updated');
      });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  logOut() {
    this.authService.logOut()
      .subscribe(() => {
        this.router.navigate(['/user/login']);
      });
  }

}