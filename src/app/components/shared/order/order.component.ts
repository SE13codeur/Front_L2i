import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICartItem, ICart, ICustomer } from '@models/index';
import { Select } from '@ngxs/store';
import { CartDrawerService, CartService, OrderService } from '@services/index';
import { CartState } from '@store/index';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnDestroy {
  @Select(CartState.getCartItems)
  cartItems$!: Observable<ICartItem[]>;
  @Select(CartState.getTotalTTC)
  totalTTC$!: Observable<number>;

  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openCartDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.router.navigate(['/items/books']); // TODO : navigate to https://stripe.com/fr/login
  }

  onConfirmOrder() {
    console.log('onConfirmOrder called');

    combineLatest({
      cartItems: this.cartItems$,
      totalTTC: this.totalTTC$,
    }).subscribe({
      next: ({ cartItems, totalTTC }) => {
        console.log('forkJoin next', cartItems, totalTTC);

        const user: ICustomer = {
          username: 'user',
          email: 'USER.EMAIL',
          password: 'user',
          id: 1,
          role: 'customer',
        };

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
      },
      error: (error) => {
        console.log('Error in forkJoin', error);
        this.snackBar.open(
          'Erreur lors de la récupération des totaux.',
          'Fermer',
          { duration: 4400 }
        );
        console.error('Error fetching totals:', error);
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
