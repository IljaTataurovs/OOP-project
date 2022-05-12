import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { RegexService } from 'src/app/services/regex.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public userData: any = this.cookieService.get('userData');
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private regexService: RegexService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(this.userData);
  }
  changeProfile(formFields: any) {
    if (this.checkFieldsForChangeProfile(formFields)) {
      let data = this.objectSanitizer(formFields);
      this.http
        .post('https://localhost:7201/user/changeProfile', data)
        .subscribe(
          (data: any) => {
            if (data.auth === true) {
              this.userData = data.userData;
            }
          },
          (error) => console.log('oops', error)
        );
    }
  }
  changePassword(formFields: any) {
    if (this.checkPasswords(formFields)) {
      let data = this.objectSanitizer(formFields);
      data.Phone = '';
      data.State = '';
      this.http
        .post('https://localhost:7201/user/changePassword', data)
        .subscribe(
          (data: any) => {
            if (data.auth === true) {
              this.userData = data.userData;
            }
          },
          (error: any) => console.log('oops', error)
        );
    }
  }

  objectSanitizer(formFields: any) {
    return {
      FirstName: this.userData.firstName,
      LastName: this.userData.lastName,
      Email: this.userData.email,
      Phone: formFields.Phone ? formFields.Phone : this.userData.Phone,
      State: formFields.State ? formFields.State : this.userData.State,
      Password: this.userData.password,
      NewPassword: formFields.newPassword ? formFields.newPassword : undefined,
    };
  }

  private checkFieldsForChangeProfile(userData: any) {
    let result = [];

    result.push(this.regexService.checkForLetter(userData.Phone));
    result.push(this.regexService.checkForNumbAndSimb(userData.State));

    return !result.includes(false);
  }
  private checkPasswords(fields: any) {
    let result = [];

    result.push(this.userData.password === fields.oldPassword);
    result.push(this.regexService.checkPassword(fields.newPassword));
    result.push(fields.newPassword === fields.repeatNewPassword);

    return !result.includes(false);
  }
}
