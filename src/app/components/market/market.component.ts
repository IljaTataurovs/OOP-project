import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/dataService';
import { ShowMoreComponent } from '../show-more/show-more.component';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  public itemsArr: any;
  modalRef?: BsModalRef;
  public subscription: Subscription;
  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private ds: DataService
  ) {
    this.subscription = this.ds.getData().subscribe((x) => {
      this.updateItems();
    });
  }

  openShowMore(data: any) {
    let state: ModalOptions = {
      initialState: {
        data: data,
        title: 'Modal with component',
      },
      class: 'modal-show-more',
    };

    this.modalRef = this.modalService.show(ShowMoreComponent, state);
  }
  updateItems() {
    this.http.get('https://localhost:7201/items').subscribe(
      (data) => {
        console.log('success', data);
        this.itemsArr = data;
      },
      (error) => console.log('oops', error)
    );
  }
  ngOnInit(): void {
    this.updateItems();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    // unsubscribe to ensure no memory leaks
  }
}
