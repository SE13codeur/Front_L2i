import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/index';
import { ICartItem, ICart, IUser } from '@models/index';
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
    private snackBar: MatSnackBar,
    private authService: AuthService
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

    combineLatest({
      cartItems: this.cartItems$,
      totalTTC: this.totalTTC$,
      user: this.authService.user$,
    }).subscribe({
      next: ({ cartItems, totalTTC, user }) => {
        console.log('combineLatest next', cartItems, totalTTC, user);

        if (user && 'billingAddress' in user) {
          const cartData: ICart = {
            cartItems,
            user: user as IUser,
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
        } else {
          console.log('No user is logged in');
          this.snackBar.open(
            'Veuillez vous connecter pour passer une commande.',
            'Fermer',
            {
              duration: 4400,
            }
          );
        }
      },
      error: (error) => {
        console.log('Error in combineLatest', error);
        this.snackBar.open(
          "Erreur lors de la récupération des totaux ou de l'utilisateur.",
          'Fermer',
          { duration: 4400 }
        );
        console.error('Error fetching totals or user:', error);
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
