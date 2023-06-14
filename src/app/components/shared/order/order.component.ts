import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICartItem, ICustomer, ICart } from '@models/index';
import { Select } from '@ngxs/store';
import { CartDrawerService, CartService, OrderService } from '@services/index';
import { CartState } from '@store/index';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  @Select(CartState.getCartItems)
  cartItems$!: Observable<ICartItem[]>;
  @Select(CartState.getTotalWithTaxes)
  totalWithTaxes$!: Observable<number>;
  @Select(CartState.getSubTotal)
  subTotal$!: Observable<number>;

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
      subTotal: this.subTotal$,
      totalWithTaxes: this.totalWithTaxes$,
    }).subscribe({
      next: ({ cartItems, subTotal, totalWithTaxes }) => {
        console.log('forkJoin next', cartItems, subTotal, totalWithTaxes);

        const user: ICustomer = {
          username: 'user',
          email: 'USER.EMAIL',
        };

        const cartData: ICart = {
          cartItems,
          user,
          totalPriceHT: subTotal,
          totalPriceTTC: totalWithTaxes,
        };

        this.orderService.createOrder(cartData).subscribe({
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
}
