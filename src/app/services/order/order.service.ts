import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev as environment } from '@env/environment.dev';
import { ICart, IOrder, IOrderLineDTO } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/items/orders`;
  private ordersAdminUrl = `${environment.apiUrl}/admin/orders`;
  private orderlinesUrl = `${environment.apiUrl}/items/orderlines`;

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
    const url = `${this.ordersAdminUrl}/${orderId}`;
    return this.http.put(url, { status: newStatus });
  }

  getOrderlinesByOrderId(orderId: number): Observable<IOrderLineDTO[]> {
    return this.http.get<IOrderLineDTO[]>(`${this.orderlinesUrl}/${orderId}`);
  }
}
