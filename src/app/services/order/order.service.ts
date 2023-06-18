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

  constructor(private http: HttpClient) {}

  createOrder(order: ICart): Observable<any> {
    return this.http.post(this.ordersUrl, order);
  }

  getOrdersByUser(user: ICustomer): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.ordersUrl}/${user.username}`);
  }

  updateOrderStatusFromUser(username: string, newStatus: string) {
    const url = `${this.ordersUrl}/${username}`;
    return this.http.put(url, { status: newStatus });
  }
}
