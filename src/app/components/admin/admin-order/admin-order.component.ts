import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { getStatusIcon, statusDescriptionToEnum } from '@libs/helpers/order';
import { IOrder, IOrderLineDTO, IUser } from '@models/index';
import { AdminAuthService, OrderService } from '@services/index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BehaviorSubject, map } from 'rxjs';

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
  user: IUser | null = null;
  currentOrderlinesDTODetails: IOrderLineDTO[] = [];

  constructor(
    private orderService: OrderService,
    private adminAuthService: AdminAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
        if (this.isAdmin) {
          this.getAllOrders();
        }
      });
    }
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (this.user && !this.isAdmin) {
        this.getOrdersByUserId(this.user.id);
      }
    });
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
        this.filterOrdersByStatus('all');
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
        this.getStatusIcon(this.selectedStatus);
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
    this.filteredOrderList$
      .asObservable()
      .pipe(
        map((orders) =>
          orders.sort(
            (a, b) =>
              new Date(b.date || '2023-07-12').getTime() -
              new Date(a.date || '2023-07-12').getTime()
          )
        )
      )
      .subscribe((sortedOrders) => this.filteredOrderList$.next(sortedOrders));
  }

  updateOrderStatus(orderId: number, newStatus: string) {
    if (this.isAdmin) {
      this.orderService
        .updateOrderStatusByOrderId(orderId, newStatus)
        .subscribe({
          next: () => {
            this.authService.user$;
            console.log('Statut de la commande mis à jour');
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

  getOrderlinesByOrderId(orderId: number): void {
    this.orderService.getOrderlinesByOrderId(orderId).subscribe({
      next: (orderLines) => {
        this.currentOrderlinesDTODetails = orderLines;
      },
      error: (error) => {
        console.error('Error while fetching order lines:', error);
      },
    });
  }

  downloadInvoice(order: any, event: Event) {
    event.stopPropagation();

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.text(`Order Number : ${order.orderNumber}`, 10, 20);
    doc.text(`Date : ${order.date}`, 10, 30);
    doc.text(`Total TTC : ${order.totalPriceTTC} €`, 10, 40);

    const orderDetails = order.items.map((item: any) => ({
      Product: item.bookTitle,
      'Unit Price TTC': `${item.unitPriceTTC} €`,
      Quantity: item.orderedQuantity,
      'Subtotal TTC': `${item.unitPriceTTC * item.orderedQuantity} €`,
    }));

    autoTable(doc, {
      head: [['Product', 'Unit Price TTC', 'Quantity', 'Subtotal TTC']],
      body: orderDetails,
      startY: 50,
    });

    doc.save(`invoice_${order.orderNumber}.pdf`);
  }

  getStatusIcon(status: string) {
    getStatusIcon(status);
  }
}
