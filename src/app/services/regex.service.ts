import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  constructor() {}

  checkPassword(password: string): boolean {
    const passw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (password.length === 0) {
      return false;
    }
    if (password.match(passw)) {
      return true;
    }
    return false;
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
  checkForNumbAndSimb(field: string): boolean {
    const regex = /^[a-zA-Z ]{2,30}$/;
    if (field.length === 0) {
      return false;
    }
    if (regex.test(field)) {
      return true;
    }
    return false;
  }
  checkForLetter(inputtxt: string): boolean {
    return /^[\d]+$/gi.test(inputtxt);
  }
}
