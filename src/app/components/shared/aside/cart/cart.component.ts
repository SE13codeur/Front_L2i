import { Component } from '@angular/core';
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

  constructor(private store: Store) {}

  removeItemFromCart(itemId: number): void {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, newQuantity));
  }

  checkout(): void {
    // Logic for checking out goes here
    console.log('Checkout');
  }
}
