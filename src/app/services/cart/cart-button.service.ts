import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartButtonService {
  itemQuantityByItemId$: {
    [itemId: number]: BehaviorSubject<number>;
  } = {};

  constructor() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('item-')) {
        const itemId = parseInt(key.split('-')[1]);
        const valueStr = localStorage.getItem(key);
        if (valueStr !== null) {
          const value = parseInt(valueStr);
          this.itemQuantityByItemId$[itemId] = new BehaviorSubject<number>(
            value
          );
        }
      }
    }
  }

  increaseItemQuantity(itemId: number, qty = 1): void {
    if (!this.itemQuantityByItemId$[itemId]) {
      this.itemQuantityByItemId$[itemId] = new BehaviorSubject<number>(0);
    }
    if (this.itemQuantityByItemId$[itemId].getValue() + qty <= 7) {
      this.updateAndPersist(
        itemId,
        this.itemQuantityByItemId$[itemId].getValue() + qty
      );
    }
  }

  decreaseItemQuantity(itemId: number, qty = 1): void {
    if (
      this.itemQuantityByItemId$[itemId] &&
      this.itemQuantityByItemId$[itemId].getValue() - qty >= 0
    ) {
      this.updateAndPersist(
        itemId,
        this.itemQuantityByItemId$[itemId].getValue() - qty
      );
    }
  }

  getQuantityByItemInCart(itemId: number): Observable<number> {
    if (!this.itemQuantityByItemId$[itemId]) {
      this.itemQuantityByItemId$[itemId] = new BehaviorSubject<number>(0);
    }
    return this.itemQuantityByItemId$[itemId].asObservable();
  }

  getTotalItemsInCart(): Observable<number> {
    const totalItemsInCart = Object.values(this.itemQuantityByItemId$);

    if (totalItemsInCart.length === 0) {
      return new BehaviorSubject(0).asObservable();
    }

    return combineLatest(totalItemsInCart).pipe(
      map((values) => values.reduce((acc, val) => acc + val, 0))
    );
  }

  private updateAndPersist(itemId: number, value: number): void {
    this.itemQuantityByItemId$[itemId].next(value);
    localStorage.setItem(`item-${itemId}`, value.toString());
  }
}
