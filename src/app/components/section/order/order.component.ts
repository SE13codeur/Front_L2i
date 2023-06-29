import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth/index';
import { ICartItem, ICart, IUser, IAddress, IOrder } from '@models/index';
import { Select } from '@ngxs/store';
import {
  AddressService,
  CartDrawerService,
  CartService,
  OrderService,
} from '@services/index';
import { CartState } from '@store/index';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  of,
  switchMap,
  take,
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
  isSubmitting: boolean = false;
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
    this.cartItems$
      .pipe(
        take(1),
        switchMap((cartItems) => {
          if (cartItems.length === 0) {
            this.snackBar.open(
              'Votre panier est vide. Veuillez ajouter des articles avant de passer une commande.',
              'Fermer',
              { duration: 4400 }
            );
            return EMPTY;
          }

          return combineLatest({
            cartItems: of(cartItems),
            totalTTC: this.totalTTC$,
            user: this.authService.user$,
            billingAddressId: of(this.selectedBillingAddress?.id),
            shippingAddressId: of(this.selectedShippingAddress?.id),
          });
        }),
        switchMap(({ cartItems, totalTTC, user }) => {
          if (!this.selectedBillingAddress || !this.selectedShippingAddress) {
            this.snackBar.open(
              'Veuillez renseigner une adresse de facturation et de livraison.',
              'Fermer',
              { duration: 4400 }
            );
            return EMPTY;
          }

          if (user) {
            const cartData: ICart = {
              cartItems,
              user: user as IUser,
              billingAddressId: this.selectedBillingAddress?.id,
              shippingAddressId: this.selectedShippingAddress?.id,
            };

            return this.orderService.createOrder(cartData).pipe(
              takeUntil(this.destroy$),
              tap(() => {
                this.snackBar.open('Commande créée avec succès!', 'Fermer', {
                  duration: 4400,
                });
                this.clearCart();
              }),
              catchError((error) => {
                console.log('Error creating order', error);
                this.snackBar.open(
                  'Erreur lors de la création de la commande.',
                  'Fermer',
                  { duration: 4400 }
                );
                console.error(error);
                return EMPTY;
              })
            );
          } else {
            console.log('No user is logged in');
            this.snackBar.open(
              'Veuillez vous connecter pour passer une commande.',
              'Fermer',
              {
                duration: 4400,
              }
            );
            return EMPTY;
          }
        })
      )
      .subscribe();
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
