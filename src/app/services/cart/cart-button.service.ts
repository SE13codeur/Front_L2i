import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartButtonService {
  itemQuantityByItemId$: {
    [itemId: number]: BehaviorSubject<number>;
  } = {};

  getItemQuantityByCardForCart(itemId: number): Observable<number> {
    if (!this.itemQuantityByItemId$[itemId]) {
      this.itemQuantityByItemId$[itemId] = new BehaviorSubject<number>(0);
    }
    return this.itemQuantityByItemId$[itemId].asObservable();
  }

  increaseItemQuantity(itemId: number, qty = 1): void {
    if (!this.itemQuantityByItemId$[itemId]) {
      this.itemQuantityByItemId$[itemId] = new BehaviorSubject<number>(0);
    }
    if (this.itemQuantityByItemId$[itemId].getValue() + qty <= 7) {
      this.itemQuantityByItemId$[itemId].next(
        this.itemQuantityByItemId$[itemId].getValue() + qty
      );
    }
  }

  decreaseItemQuantity(itemId: number, qty = 1): void {
    if (
      this.itemQuantityByItemId$[itemId] &&
      this.itemQuantityByItemId$[itemId].getValue() - qty >= 0
    ) {
      this.itemQuantityByItemId$[itemId].next(
        this.itemQuantityByItemId$[itemId].getValue() - qty
      );
    }
  }

  getTotalItemsForCart(): Observable<number> {
    const totalItemsForCart = Object.values(this.itemQuantityByItemId$);

    if (totalItemsForCart.length === 0) {
      return new BehaviorSubject(0).asObservable();
    }

    return combineLatest(totalItemsForCart).pipe(
      map((values) => values.reduce((acc, val) => acc + val, 0))
    );
  }
}
