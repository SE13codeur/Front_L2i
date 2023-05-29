import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState, UpdateCartItemQuantity } from '@store/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemQuantityService {
  constructor(private store: Store) {}

  increaseItemQuantity(itemId: number, qty = 1): void {
    this.store.dispatch(new IncreaseCartItemQuantity(itemId, qty));
  }

  decreaseItemQuantity(itemId: number, qty = 1): void {
    this.store.dispatch(new DecreaseCartItemQuantity(itemId, qty));
  }

  getCartItemQuantity(itemId: number): Observable<number> {
    return this.store.select(CartState.getCartItemQuantity(itemId));
  }

  getTotalItemsInCart(): Observable<number> {
    return this.store.select(CartState.getTotalItems);
  }

  changeCartItemQuantity(itemId: number, quantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, quantity));
  }
}
