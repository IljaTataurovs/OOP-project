import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/dataService';
interface user {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  State: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  errorMessage: string = '';
  isErrorVisible: boolean = false;
  isEmailCorrect: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private ds: DataService
  ) {}

  loginUser(userData: user) {
    userData.FirstName = '';
    userData.LastName = '';
    userData.State = '';
    userData.Phone = '';
    userData.State = '';
    this.isEmailCorrect = !this.checkEmail(userData.Email);
    if (this.checkEmail(userData.Email)) {
      this.http.post('https://localhost:7201/user/login', userData).subscribe(
        (data: any) => {
          if (!data.auth) {
            this.errorMessage = data.message;
            this.isErrorVisible = true;
          } else {
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
  checkEmail(email: string): boolean {
    if (email.length === 0) {
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {}
}
