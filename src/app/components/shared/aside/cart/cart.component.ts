import { Component, OnInit } from '@angular/core';
import { ICartItem } from '@models/cart';
import { IItem } from '@models/item';
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
  @Select(CartState.getDetailedCartItems) cartItems$:
    | Observable<IItem[]>
    | undefined;

  @Select(CartState.getTotalItems) totalItems$: Observable<number> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  removeItemFromCart(itemId: number): void {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  updateCartItemQuantity(itemId: number, newQty: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, newQty));
  }

  getCartItemInStock(itemId: number): Observable<ICartItem | undefined> {
    return this.store.select((state) =>
      CartState.getCartItemInStock(state.cart, state.item)(itemId)
    );
  }

  checkout(): void {
    // Logic for checking out goes here
    console.log('Checkout');
  }
}
