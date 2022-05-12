import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dataService';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  constructor(private http: HttpClient, private ds: DataService) {}
  createItem(item: any) {
    this.http.post('https://localhost:7201/items/createItem', item).subscribe(
      (data: any) => {
        console.log(data);
        this.ds.sendData(true);
      },
      (error) => console.log('oops', error)
    );
  }
  ngOnInit(): void {}
}
