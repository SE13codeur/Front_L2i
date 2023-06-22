import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev as environment } from '@env/environment.dev';
import { ICart, IOrder } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/items/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: ICart): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}`);
  }

  getOrderById(orderId: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.ordersUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}/${userId}`);
  }

  updateOrderStatusByOrderId(
    orderId: number,
    newStatus: string
  ): Observable<any> {
    console.log(orderId, newStatus);
    const url = `${this.ordersUrl}/${orderId}`;
    return this.http.patch(url, { status: newStatus });
  }
}
