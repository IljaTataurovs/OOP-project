import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/dataService';
import { CreateItemComponent } from '../create-item/create-item.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  public isLoginIn: any;
  public subscription: Subscription;

  constructor(private modalService: BsModalService, private ds: DataService) {
    this.subscription = this.ds.getData().subscribe((x) => {
      this.isLoginIn = x;
    });
  }

  openSignUp() {
    this.modalRef = this.modalService.show(SignupComponent);
  }
  openSignIn() {
    this.modalRef = this.modalService.show(SigninComponent);
  }
  openCreateItem() {
    this.modalRef = this.modalService.show(CreateItemComponent);
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
    // unsubscribe to ensure no memory leaks
  }
}
