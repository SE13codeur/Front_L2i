import { Component, OnInit } from '@angular/core';
import { IOrder } from '@models/order/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderList$ = new BehaviorSubject<IOrder[]>([]);

  constructor() {}

  ngOnInit(): void {}
}
