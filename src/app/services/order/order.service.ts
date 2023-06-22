import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev as environment } from '@env/environment.dev';
import { ICart, IOrder } from '@models/index';
import { Console } from 'console';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/items/orders`;
  private ordersAdminUrl = `${environment.apiUrl}/admin/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: ICart): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  getOrdersByUserId(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}/${userId}`);
  }

  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersAdminUrl}`);
  }

  updateOrderStatusByOrderId(
    orderId: number,
    newStatus: string
  ): Observable<any> {
    console.log(orderId, newStatus);
    const url = `${this.ordersAdminUrl}/${orderId}`;
    return this.http.put(url, { status: newStatus });
  }

  // getOrderById(orderId: number): Observable<IOrder> {
  //   return this.http.get<IOrder>(`${this.ordersAdminUrl}/${orderId}`);
  // }
}
