import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/dataService';
import * as CryptoJS from 'crypto-js';
import { RegexService } from 'src/app/services/regex.service';
interface user {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  State: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isEmailRight = true;
  isPasswordRight = true;
  isNameRight = true;

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private ds: DataService,
    private regexService: RegexService
  ) {}

  signUp(userData: user) {
    userData.State = '';
    userData.Phone = '';
    const isCheckedUserFields = this.checkFields(userData);

    if (isCheckedUserFields) {
      this.http.post('https://localhost:7201/user/signUp', userData).subscribe(
        (data: any) => {
          if (data.auth) {
            this.bsModalRef.hide();
            let today = new Date();
            today.setMinutes(today.getMinutes() + 1);
            this.cookieService.set('login', 'true', today);
            today.setMinutes(today.getMinutes() + 4);
            data.userData.Password = this.encrypt(data.userData.Password);
            this.cookieService.set(
              'userData',
              JSON.stringify(data.userData),
              today
            );
            this.ds.sendData(true);
            this.router.navigate(['']);
          }
        },
        (error) => console.log('oops', error)
      );
    }
  }
  encrypt(string: string) {
    var passPhrase = 'Secret Phassphrase';

    var encrypted = CryptoJS.AES.encrypt(string, passPhrase, {
      mode: CryptoJS.mode.CFB,
    });

    return encrypted.toString();
  }

  ngOnInit(): void {}

  private checkFields(userData: user) {
    let result = [];

    result.push(this.regexService.checkEmail(userData.Email));
    this.isEmailRight = result[0];
    result.push(this.regexService.checkPassword(userData.Password));
    this.isPasswordRight = result[1];
    result.push(this.regexService.checkForNumbAndSimb(userData.FirstName));
    result.push(this.regexService.checkForNumbAndSimb(userData.LastName));
    if (result[3] && result[2]) {
      this.isNameRight = true;
    } else {
      this.isNameRight = false;
    }

    return !result.includes(false);
  }
}
