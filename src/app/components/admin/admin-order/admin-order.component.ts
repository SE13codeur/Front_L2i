import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import {
  IOrder,
  IUser,
  OrderStatus,
  statusDescriptionToEnum,
} from '@models/index';
import { AdminAuthService, OrderService } from '@services/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css'],
})
export class AdminOrderComponent implements OnInit {
  orderList$ = new BehaviorSubject<IOrder[]>([]);
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
        this.getAllOrders();
      });
    }
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.user && !this.isAdmin) {
      this.getOrdersByUserId(this.user.id);
    }
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      },
    });
  }

  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des commandes:', error);
      },
    });
  }

  fetchOrdersByUserAndStatus(userId: number, statusDescription?: string): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
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
    const orders = this.orderList$.getValue();
    const statusEnum = statusDescriptionToEnum(description);

    const filteredOrders =
      description === 'all'
        ? orders
        : orders.filter((order) => order.status === statusEnum);

    this.filteredOrderList$.next(filteredOrders);
  }

  updateOrderStatus(userId: number, orderId: number, newStatus: string) {
    if (this.isAdmin) {
      this.orderService
        .updateOrderStatusByOrderId(orderId, newStatus)
        .subscribe({
          next: () => {
            console.log('Statut de la commande mis à jour');
            this.fetchOrdersByUserAndStatus(userId, newStatus);
          },
          error: (error) => {
            console.error(
              'Erreur lors de la mise à jour du statut de la commande:',
              error
            );
          },
        });
    }
  }
}
