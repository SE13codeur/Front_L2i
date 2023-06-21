import { Component, OnInit } from '@angular/core';
import { OrderStatus } from '@models/index';
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
  orderListByUser$ = new BehaviorSubject<IOrder[]>([]);
  filteredOrderList$ = new BehaviorSubject<IOrder[]>([]);

  expandedOrderDetails: number | null | undefined = null;
  selectedStatus: string = 'all';

  isAdmin = false;

  arrayOfOrderNumberAndStatus: {
    orderNumber: string;
    orderStatus: OrderStatus;
  }[] = [];

  constructor(
    private orderService: OrderService,
    private adminAuthService: AdminAuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.adminAuthService.isAdminAuthenticated();
  }

  fetchOrdersByUserId(userId: number, statusDescription?: string): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
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

  // Dans order-list.component.ts

  getStatusByOrderId(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe(
      (order: IOrder) => {
        return order.status;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération du statut de la commande:',
          error
        );
      }
    );
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

  updateOrderStatus(userId: number, orderId: number, newStatus: string): void {
    if (this.isAdmin) {
      this.getStatusByOrderId(orderId);
      this.orderService
        .updateOrderStatusByOrderId(orderId, newStatus)
        .subscribe(() => {
          console.log('Statut de la commande mis à jour');
          const newStatusDescription = getOrderStatusDescription(newStatus);
          this.fetchOrdersByUserId(userId, newStatusDescription);
        });
    }
  }
}
