import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { getStatusIcon, statusDescriptionToEnum } from '@libs/helpers/order';
import { IUser } from '@models/index';
import { IOrder, IOrderLineDTO } from '@models/order/index';
import { OrderService } from '@services/index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orderList$ = new BehaviorSubject<IOrder[]>([]);
  filteredOrderList$ = new BehaviorSubject<IOrder[]>([]);
  expandedOrderDetails: number | null | undefined = null;
  selectedStatus: string = 'all';
  selectedFilter = 'all';
  currentOrderlinesDTODetails: IOrderLineDTO[] = [];
  isAdmin = false;
  user: IUser | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (this.user && !this.isAdmin) {
        this.getOrdersByUserId(this.user.id);
      }
    });
  }

  getOrdersByUserId(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orderList$.next(orders);
        this.filterOrdersByStatus('all');
      },
      error: (error) => {
        console.error('Error while fetching orders:', error);
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
        console.error('Error while fetching orders:', error);
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
    doc.text('FACTURE', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.text(`Order Number : ${order.orderNumber}`, 10, 20);
    doc.text(`Date : ${order.date}`, 10, 30);
    doc.text(`Total TTC : ${order.totalPriceTTC} €`, 10, 40);

    const orderDetails = (order.items || []).map((item: any) => ({
      Article: item.bookTitle,
      'Prix unitaire': `${item.unitPriceTTC} €`,
      Quantity: item.orderedQuantity,
      'Sous total TTC': `${item.unitPriceTTC * item.orderedQuantity} €`,
    }));

    autoTable(doc, {
      head: [['Article', 'Prix Unitaire TTC', 'Quantité', 'Sous total TTC']],
      body: orderDetails,
      startY: 50,
    });

    doc.save(`invoice_${order.orderNumber}.pdf`);
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'PENDING':
        return 'hourglass_empty';
      case 'CONFIRMED':
        return 'check_circle';
      case 'SHIPPING':
        return 'local_shipping';
      case 'DELIVERED':
        return 'done_all';
      default:
        return 'info';
    }
  }
}
