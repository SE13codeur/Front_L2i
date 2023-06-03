import { Component, OnInit } from '@angular/core';
import { IOrder } from '@models/cart';
import { Select } from '@ngxs/store';
import { OrderState } from '@store/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  @Select(OrderState.getOrders) orders$: Observable<IOrder[]> | undefined;

  constructor() {}

  ngOnInit(): void {}
}
