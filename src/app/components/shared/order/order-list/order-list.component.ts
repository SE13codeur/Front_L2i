import { Component, OnInit } from '@angular/core';
import { ICustomer } from '@models/index';
import { IOrder, OrderStatus } from '@models/order/index';
import { AuthService, OrderService } from '@services/index';
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
  isAdmin = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.isAdmin = this.authService.isAdminAuthenticated();
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

  updateOrderStatus(
    user: ICustomer,
    orderNumber: string,
    newStatus: string
  ): void {
    if (this.isAdmin) {
      const statusMapping: { [key: string]: OrderStatus } = {
        'En attente de confirmation': OrderStatus.PENDING,
        Confirmé: OrderStatus.CONFIRMED,
        'En cours de livraison': OrderStatus.SHIPPING,
        Livré: OrderStatus.DELIVERED,
      };

      const enumStatus = statusMapping[newStatus];

      this.orderService
        .updateOrderStatusFromUser(user.username, orderNumber, enumStatus)
        .subscribe(() => {
          console.log('Order status updated');
          this.fetchOrders(); // refresh the list
        });
    }
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
}
