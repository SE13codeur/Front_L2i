import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { getStatusIcon, statusDescriptionToEnum } from '@libs/helpers/order';
import { IOrder, IOrderLineDTO, IUser } from '@models/index';
import { AdminAuthService, OrderService } from '@services/index';
import { format } from 'date-fns';
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

  async downloadInvoice(order: IOrder, event: Event) {
    event.stopPropagation();
    await this.getOrderlinesByOrderId(order.id);

    const doc = new jsPDF();

    const logoUrl = '../../../../../assets/L2i.png';
    const logo = new Image();
    logo.src = logoUrl;
    await new Promise((resolve) => {
      logo.onload = resolve;
    });
    const canvas = document.createElement('canvas');
    canvas.width = logo.width;
    canvas.height = logo.height;
    const context = canvas.getContext('2d');
    context?.drawImage(logo, 0, 0, logo.width, logo.height);
    const logoDataUrl = canvas.toDataURL('image/png');
    doc.addImage(logoDataUrl, 'PNG', 10, 10, 30, 30);

    doc.setFontSize(18);
    doc.text('FACTURE', 89, 17);
    doc.setFontSize(11);
    doc.setTextColor(100);

    doc.text(`Order Number : ${order.orderNumber}`, 10, 60);
    doc.text(
      `Date : ${
        order.date ? format(new Date(order.date), 'dd/MM/yyyy') : 'N/A'
      }`,
      10,
      70
    );
    doc.text(`Total HT : ${order.totalPriceHT} €`, 10, 80);
    doc.text(`Total TTC : ${order.totalPriceTTC} €`, 10, 90);
    doc.text(
      `Client : ${order.user?.firstname} ${order.user?.lastname}`,
      10,
      100
    );

    doc.text(
      `Adresse de facturation : ${order.billingAddress?.street}, ${order.billingAddress?.city}, ${order.billingAddress?.zipCode}, ${order.billingAddress?.country}`,
      10,
      110
    );
    doc.text(
      `Adresse d'expédition : ${order.shippingAddress?.street}, ${order.shippingAddress?.city}, ${order.shippingAddress?.zipCode}, ${order.shippingAddress?.country}`,
      10,
      120
    );

    autoTable(doc, {
      head: [
        [
          'Article',
          'Prix Unitaire HT',
          'TVA',
          'Prix Unitaire TTC',
          'Quantité',
          'Sous Total TTC',
        ],
      ],
      body: this.currentOrderlinesDTODetails.map((item: any) => [
        item.bookTitle,
        `${item.unitPriceHT.toFixed(2)} €`,
        `${(item.tvaRate * 100).toFixed(2)}%`,
        `${item.unitPriceTTC.toFixed(2)} €`,
        `${item.orderedQuantity}`,
        `${(item.orderedQuantity * item.unitPriceTTC).toFixed(2)} €`,
      ]),
      startY: 140,
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    doc.setFontSize(16);
    doc.text('Total HT :', 10, finalY + 20);
    doc.text(`${order.totalPriceHT.toFixed(2)} €`, 50, finalY + 20);

    const totalTVA = order.totalPriceTTC - order.totalPriceHT;
    doc.text('TVA :', 10, finalY + 30);
    doc.text(`${totalTVA.toFixed(2)} €`, 50, finalY + 30);

    doc.text('Total TTC :', 10, finalY + 40);
    doc.text(`${order.totalPriceTTC.toFixed(2)} €`, 50, finalY + 40);

    doc.save(`invoice_${order.orderNumber}.pdf`);
  }

  getStatusIcon(status: string) {
    getStatusIcon(status);
  }
}
