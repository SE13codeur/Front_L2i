import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICartItem } from '@models/cart';
import { Select, Store } from '@ngxs/store';
import {
  CartState,
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

  removeItemFromCart(itemId: number): void {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, newQuantity));
  }

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  orderValidate(): void {
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
      this.router.navigate(['/payment']);
    });
  }
}
