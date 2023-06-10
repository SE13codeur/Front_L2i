import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckAuthService } from '@auth-s/check-auth.service';
import { ICartItem } from '@models/cart';
import { Select, Store } from '@ngxs/store';
import {
  CartState,
  ClearCart,
  RemoveFromCart,
  UpdateCartItemQuantity,
} from '@store/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @ViewChild('errorDialog') errorDialog: TemplateRef<any> | undefined;
  @Select(CartState.getCartItems) cartItems$:
    | Observable<ICartItem[]>
    | undefined;
  @Select(CartState.getCartTotalItems) totalItems$:
    | Observable<number>
    | undefined;
  @Select(CartState.getSubTotal) subTotal$: Observable<number> | undefined;
  @Select(CartState.getTotalWithTaxes) totalWithTaxes$:
    | Observable<number>
    | undefined;

  isAuthenticated$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private checkAuthService: CheckAuthService
  ) {}

  removeItemFromCart(itemId: number): void {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, newQuantity));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }

  orderValidate(): void {
    if (!this.checkAuthService.checkAuthenticationAndRedirect()) {
      // Redirect to login page and come back to the current state after login
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
      return;
    }
    if (!!this.checkAuthService.checkAuthenticationAndRedirect()) {
      this.cartItems$?.subscribe((cartItems) => {
        for (let cartItem of cartItems) {
          if (cartItem.quantity > cartItem.quantityInStock) {
            if (this.errorDialog) {
              const dialogRef = this.dialog.open(this.errorDialog, {
                data: {
                  message: `La quantité commandée pour ${cartItem.title} est supérieure à celle en stock.`,
                },
              });
              setTimeout(() => {
                dialogRef.close();
              }, 4004);
            }
            return;
          }
        }
        this.router.navigate(['/items/payment']);
      });
    }
  }
}
