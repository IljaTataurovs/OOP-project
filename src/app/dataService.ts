import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataService {
  private subject = new Subject<any>();
  private items = new Subject<any>();

  startUpdateItems(message: boolean) {
    this.subject.next(message);
  }
  getDataItemsFromDb(): Observable<any> {
    return this.items.asObservable();
  }

  sendData(message: boolean) {
    this.subject.next(message);
  }

  clearData() {
    this.subject.next('');
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
