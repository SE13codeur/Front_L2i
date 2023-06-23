import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { IUser } from '@models/index';
import {
  IOrder,
  IOrderLineDTO,
  statusDescriptionToEnum,
} from '@models/order/index';
import { OrderService } from '@services/index';
import jsPDF from 'jspdf';
import { BehaviorSubject } from 'rxjs';

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

  getOrderlinesByOrderId(orderId: number): void {
    this.orderService.getOrderlinesByOrderId(orderId).subscribe({
      next: (orderLines) => {
        this.currentOrderlinesDTODetails = orderLines;
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des lignes de commande:',
          error
        );
      },
    });
  }

  downloadInvoice(order: any, event: Event) {
    event.stopPropagation();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Facture', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);

    let currentY = 20;

    doc.text(`Numéro de commande : ${order.orderNumber}`, 10, currentY);
    currentY += 10;
    doc.text(`Date : ${order.date}`, 10, currentY);
    currentY += 10;
    doc.text(`Total TTC : ${order.totalPriceTTC} €`, 10, currentY);
    currentY += 10;

    doc.text('Détails de commande:', 10, currentY);
    currentY += 10;

    for (let item of order.items) {
      doc.text(`Article : ${item.bookTitle}`, 10, currentY);
      doc.text(`Prix Unitaire TTC : ${item.unitPriceTTC} €`, 10, currentY + 10);
      doc.text(`Quantité : ${item.orderedQuantity}`, 10, currentY + 20);
      doc.text(
        `Sous-total TTC : ${item.unitPriceTTC * item.orderedQuantity} €`,
        10,
        currentY + 30
      );
      currentY += 40;
    }

    doc.save(`facture_${order.orderNumber}.pdf`);
  }
}
