import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState, UpdateCartItemQuantity } from '@store/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemQuantityService {
  constructor(private store: Store) {}

  getCartItemQuantity(itemId: number): Observable<number> {
    return this.store.select((state) =>
      CartState.getCartItemQuantity(state.cart)(itemId)
    );
  }

  getCartTotalItems(): Observable<number> {
    return this.store.select(CartState.getCartTotalItems);
  }

  changeCartItemQuantity(itemId: number, quantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, quantity));
  }
}
