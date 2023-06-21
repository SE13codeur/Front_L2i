import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev as environment } from '@env/environment.dev';
import { ICart, ICustomer, IOrder } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/items/orders`;
  private userOrdersUrl = `${environment.apiUrl}/users/:id/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: ICart): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  getOrderById(orderId: number) {
    return this.http.get<IOrder>(`${this.ordersUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}/${userId}`);
  }

  updateOrderStatusByOrderId(orderId: number, newStatus: string) {
    const url = `${this.userOrdersUrl}/${orderId}`;
    return this.http.put(url, { status: newStatus });
  }
}
