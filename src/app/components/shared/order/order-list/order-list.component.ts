import { Component, OnInit } from '@angular/core';
import { IOrder } from '@models/order/index';
import { ICustomer } from '@models/index';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from '@services/index';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderList$ = new BehaviorSubject<IOrder[]>([]);
  currentUser: ICustomer = {
    username: 'user',
    email: 'user@gmail.com',
    password: 'user',
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUser(this.currentUser).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }
}
