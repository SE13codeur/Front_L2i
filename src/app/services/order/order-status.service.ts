import { Injectable } from '@angular/core';
import { IOrder, OrderStatus } from '@models/index';
import { Store } from '@ngxs/store';
import {
  GetOrderStatus,
  OrderState,
  SetOrderStatuses,
  UpdateOrderStatus,
} from '@store/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  constructor(private store: Store) {}

  updateOrderStatus(orderNumber: string, newStatus: OrderStatus): void {
    this.store.dispatch(new UpdateOrderStatus(orderNumber, newStatus));
  }

  getOrdersByStatus(orderStatus: OrderStatus): Observable<IOrder[]> {
    return this.store.select(OrderState.getOrdersByStatus(orderStatus));
  }

  getStatusByOrderNumber(orderNumber: string, orderStatus: Observable<string>) {
    this.store.dispatch(new GetOrderStatus(orderNumber, orderStatus));
  }
}
