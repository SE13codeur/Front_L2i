import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/index';
import { ICartItem, ICart, IUser, IAddress } from '@models/index';
import { Select } from '@ngxs/store';
import {
  AddressService,
  CartDrawerService,
  CartService,
  OrderService,
} from '@services/index';
import { CartState } from '@store/index';
import {
  Observable,
  Subject,
  combineLatest,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  @Select(CartState.getCartItems)
  cartItems$!: Observable<ICartItem[]>;
  @Select(CartState.getTotalTTC)
  totalTTC$!: Observable<number>;
  user!: IUser | null;
  addresses!: IAddress[];
  selectedBillingAddress!: IAddress | null;
  selectedShippingAddress!: IAddress | null;
  displayedColumns: string[] = [
    'title',
    'street',
    'city',
    'state',
    'zipCode',
    'country',
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((user) => {
          this.user = user;
        }),
        switchMap((user) => {
          if (user) {
            this.addressService.getAddressesByUserId(user.id);
            return this.addressService.addresses$;
          } else {
            return of([]);
          }
        })
      )
      .subscribe((addresses) => {
        this.addresses = addresses;
        if (this.user) {
          this.user.addresses = addresses;
        }
      });
  }

  openCartDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.router.navigate(['/items/books']);
  }

  onConfirmOrder() {
    combineLatest({
      cartItems: this.cartItems$,
      totalTTC: this.totalTTC$,
      user: this.authService.user$,
    }).subscribe({
      next: ({ cartItems, totalTTC, user }) => {
        if (user) {
          const cartData: ICart = {
            cartItems,
            user: user as IUser,
          };

          this.orderService
            .createOrder(cartData)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
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

  goToAddressForm(): void {
    if (this.user) {
      this.router.navigate(['/account/user/profile/address']);
    }
  }

  displayBillingAddressDetails(id: number): void {
    const address = this.addresses.find((address) => address.id === id);
    this.selectedBillingAddress = address || null;
  }

  displayShippingAddressDetails(id: number): void {
    const address = this.addresses.find((address) => address.id === id);
    this.selectedShippingAddress = address || null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
