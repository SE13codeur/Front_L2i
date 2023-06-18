import { Component, OnInit } from '@angular/core';
import { ICustomer } from '@models/index';
import {
  IOrder,
  getOrderStatusDescription,
  statusDescriptionToEnum,
} from '@models/order/index';
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

  fetchOrders(statusDescription?: string): void {
    this.orderService.getOrdersByUser(this.currentUser).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
        if (statusDescription) {
          this.selectedStatus = statusDescription;
        }
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

  filterOrdersByStatus(description: string): void {
    const orders = this.orderList$.getValue();
    const statusEnum = statusDescriptionToEnum(description);

    const filteredOrders =
      description === 'all'
        ? orders
        : orders.filter((order) => order.status === statusEnum);

    this.filteredOrderList$.next(filteredOrders);
  }

  updateOrderStatus(
    user: ICustomer,
    orderNumber: string,
    newStatus: string
  ): void {
    if (this.isAdmin) {
      this.orderService
        .updateOrderStatusFromUser(user.username, orderNumber, newStatus)
        .subscribe(() => {
          console.log('Order status updated');
          const newStatusDescription = getOrderStatusDescription(newStatus);
          this.fetchOrders(newStatusDescription);
        });
    }
  }
}
