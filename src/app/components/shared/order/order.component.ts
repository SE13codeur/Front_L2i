import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICart, ICustomer } from '@models/index';
import {
  CartDrawerService,
  CartService,
  OrderService,
  UserStoreService,
} from '@services/index';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnDestroy {
  cartItems$ = this.cartService.getCartItems();
  totalTTC$ = this.cartService.getTotalTTC();
  user$ = this.userStoreService.getUser();

  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService,
    private router: Router,
    private userStoreService: UserStoreService,
    private snackBar: MatSnackBar
  ) {}

  openCartDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.router.navigate(['/items/books']);
  }

  onConfirmOrder() {
    console.log('onConfirmOrder called');

    combineLatest([this.cartItems$, this.totalTTC$, this.user$])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([cartItems, _totalTTC, user]) => {
          if (user) {
            const cartData: ICart = {
              cartItems,
              user,
            };

            this.orderService
              .createOrder(cartData)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  console.log('Order created successfully');
                  this.snackBar.open('Commande créée avec succès!', 'Fermer', {
                    duration: 4400,
                  });
                  this.clearCart();
                },
                error: (error) => {
                  console.log('Error creating order', error);
                  this.snackBar.open(
                    'Erreur lors de la création de la commande.',
                    'Fermer',
                    { duration: 4400 }
                  );
                  console.error(error);
                },
              });
          }
        },
        error: (error) => {
          console.log('Error in combineLatest', error);
          this.snackBar.open(
            'Erreur lors de la récupération des totaux.',
            'Fermer',
            { duration: 4400 }
          );
          console.error('Error fetching totals:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
