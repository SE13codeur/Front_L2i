import { Component, OnInit } from '@angular/core';
import { extractOrderNumberAndStatus } from '@libs/index';
import { ICustomer } from '@models/index';
import {
  IOrder,
  OrderStatus,
  getOrderStatusDescription,
  statusDescriptionToEnum,
} from '@models/order/index';
import { AuthService, OrderService, OrderStatusService } from '@services/index';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderListByUser$ = new BehaviorSubject<IOrder[]>([]);
  filteredOrderList$ = new BehaviorSubject<IOrder[]>([]);
  currentUser: ICustomer = {
    username: 'user',
    email: 'user@gmail.com',
    password: 'user',
  };

  expandedOrderDetails: number | null | undefined = null;
  selectedStatus: string = 'all';

  isAdmin = false;

  arrayOfOrderNumberAndStatus: {
    orderNumber: string;
    orderStatus: OrderStatus;
  }[] = [];

  constructor(
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  fetchOrders(statusDescription?: string): void {
    this.orderService.getOrdersByUser(this.currentUser).subscribe({
      next: (orders) => {
        this.orderListByUser$.next(orders);
        if (statusDescription) {
          this.selectedStatus = statusDescription;
        }
        this.filterOrdersByStatus(this.selectedStatus);

        this.arrayOfOrderNumberAndStatus = orders.map((order) => ({
          orderNumber: order.orderNumber,
          orderStatus: order.status,
        }));
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      },
    });
  }

  getStatusByOrderNumber(orderNumber: string) {
    this.orderStatusService.getStatusByOrderNumber(orderNumber);
  }

  toggleOrderDetails(order: IOrder): void {
    this.expandedOrderDetails =
      this.expandedOrderDetails === order.id ? null : order.id;
  }

  isOrderExpanded(order: IOrder): boolean {
    return this.expandedOrderDetails === order.id;
  }

  filterOrdersByStatus(description: string): void {
    const orders = this.orderListByUser$.getValue();
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
          console.log('Statut de la commande mis à jour');
          const newStatusDescription = getOrderStatusDescription(newStatus);
          this.fetchOrders(newStatusDescription);
        });
    }
  }
}
