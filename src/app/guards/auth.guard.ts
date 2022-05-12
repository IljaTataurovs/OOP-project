import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SigninComponent } from '../components/signin/signin.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  modalRef?: BsModalRef;
  constructor(
    private router: Router,
    private modalService: BsModalService,
    public cookieService: CookieService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isAuthenticated = this.cookieService.get('login');
    if (!isAuthenticated) {
      this.router.navigate(['']);
      this.modalRef = this.modalService.show(SigninComponent);
    }
    return isAuthenticated === 'true';
  }
}
