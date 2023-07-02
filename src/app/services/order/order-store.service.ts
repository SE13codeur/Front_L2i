import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentPreProd as environment } from '@env/environment.pre-prod';
import { IOrder, OrderStatus } from '@models/index';
import { Store } from '@ngxs/store';
import { OrderState, UpdateOrderStatus } from '@store/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderStoreService {
  constructor(private store: Store) {}

  updateOrderStatus(orderNumber: string, newStatus: OrderStatus): void {
    this.store.dispatch(new UpdateOrderStatus(orderNumber, newStatus));
  }

  getOrdersByStatus(orderStatus: OrderStatus): Observable<IOrder[]> {
    return this.store.select(OrderState.getOrdersByStatus(orderStatus));
  }
}
