import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { IUser, OrderStatus } from '@models/index';
import {
  IOrder,
  getOrderStatusDescription,
  statusDescriptionToEnum,
} from '@models/order/index';
import { AdminAuthService, OrderService } from '@services/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderListByUserId$ = new BehaviorSubject<IOrder[]>([]);
  filteredOrderList$ = new BehaviorSubject<IOrder[]>([]);

  expandedOrderDetails: number | null | undefined = null;
  selectedStatus: string = 'all';

  isAdmin = false;

  arrayOfOrderNumberAndStatus: {
    orderNumber: string;
    orderStatus: OrderStatus;
  }[] = [];

  user: IUser | null = null;

  constructor(
    private orderService: OrderService,
    private adminAuthService: AdminAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.user) {
      this.getOrdersByUserId(this.user.id);
    }
  }

  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orderListByUserId$.next(orders);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      },
    });
  }

  fetchOrdersByUserAndStatus(userId: number, statusDescription?: string): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orderListByUserId$.next(orders);
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

  toggleOrderDetails(order: IOrder): void {
    this.expandedOrderDetails =
      this.expandedOrderDetails === order.id ? null : order.id;
  }

  isOrderExpanded(order: IOrder): boolean {
    return this.expandedOrderDetails === order.id;
  }

  filterOrdersByStatus(description: string): void {
    const orders = this.orderListByUserId$.getValue();
    const statusEnum = statusDescriptionToEnum(description);

    const filteredOrders =
      description === 'all'
        ? orders
        : orders.filter((order) => order.status === statusEnum);

    this.filteredOrderList$.next(filteredOrders);
  }

  updateOrderStatus(userId: number, orderId: number, newStatus: string): void {
    if (this.isAdmin) {
      this.orderService
        .updateOrderStatusByOrderId(orderId, newStatus)
        .subscribe(() => {
          console.log('Statut de la commande mis à jour');
          const newStatusDescription = getOrderStatusDescription(newStatus);
          this.fetchOrdersByUserAndStatus(userId, newStatusDescription);
        });
    }
  }
}
