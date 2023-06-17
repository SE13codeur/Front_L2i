import { Component, OnInit } from '@angular/core';
import { ICustomer } from '@models/index';
import { IOrder, OrderStatus } from '@models/order/index';
import { OrderService } from '@services/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderList$ = new BehaviorSubject<IOrder[]>([]);
  filteredOrderList$ = new BehaviorSubject<IOrder[]>([]);
  currentUser: ICustomer = {
    username: 'user',
    email: 'user@gmail.com',
    password: 'user',
  };

  expandedOrderDetails: number | null | undefined = null;
  selectedStatus: string = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUser(this.currentUser).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
        this.filterOrdersByStatus(this.selectedStatus);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  toggleOrderDetails(order: IOrder): void {
    this.expandedOrderDetails =
      this.expandedOrderDetails === order.id ? null : order.id;
  }

  isOrderExpanded(order: IOrder): boolean {
    return this.expandedOrderDetails === order.id;
  }

  filterOrdersByStatus(value: string): void {
    console.log('Filter value:', value);

    const statusMapping: { [key: string]: string } = {
      'En attente de confirmation': 'PENDING',
      Confirmé: 'CONFIRMED',
      'En cours de livraison': 'SHIPPING',
      Livré: 'DELIVERED',
    };

    const orders = this.orderList$.getValue();
    const filteredOrders =
      value === 'all'
        ? orders
        : orders.filter((order) => {
            return order.status === statusMapping[value];
          });

    this.filteredOrderList$.next(filteredOrders);
  }

  getStatusDescription(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'En attente de confirmation';
      case OrderStatus.CONFIRMED:
        return 'Confirmé';
      case OrderStatus.SHIPPING:
        return 'En cours de livraison';
      case OrderStatus.DELIVERED:
        return 'Livré';
      default:
        return '';
    }
  }
}
