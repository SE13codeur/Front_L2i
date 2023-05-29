import { Component, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {
  @Select(CartState.getCartItems) cartItems$:
    | Observable<ICartItem[]>
    | undefined;

  @Select(CartState.getQuantityByItem) itemQuantity$:
    | Observable<number>
    | undefined;

  @Select(CartState.getTotalItems) totalItems$: Observable<number> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  increaseQuantity(itemId: number): void {
    let item = this.store
      .selectSnapshot(CartState.getCartItems)
      .find((a) => a.id === itemId);
    if (item) {
      this.store.dispatch(
        new UpdateCartItemQuantity(itemId, item.quantity + 1)
      );
    }
  }

  decreaseQuantity(itemId: number): void {
    let item = this.store
      .selectSnapshot(CartState.getCartItems)
      .find((a) => a.id === itemId);
    if (item && item.quantity > 0) {
      this.store.dispatch(
        new UpdateCartItemQuantity(itemId, item.quantity - 1)
      );
    }
  }

  checkout(): void {
    // Logic for checking out goes here
    console.log('Checkout');
  }
}
