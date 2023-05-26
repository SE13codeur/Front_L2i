import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartButtonService {
  itemsQuantities$: { [itemId: number]: BehaviorSubject<number> } = {};

  getItemQuantity(itemId: number): Observable<number> {
    if (!this.itemsQuantities$[itemId]) {
      this.itemsQuantities$[itemId] = new BehaviorSubject<number>(0);
    }
    return this.itemsQuantities$[itemId].asObservable();
  }

  increaseItemQty(itemId: number, qty = 1): void {
    if (!this.itemsQuantities$[itemId]) {
      this.itemsQuantities$[itemId] = new BehaviorSubject<number>(0);
    }
    if (this.itemsQuantities$[itemId].getValue() + qty <= 7) {
      this.itemsQuantities$[itemId].next(
        this.itemsQuantities$[itemId].getValue() + qty
      );
    }
  }

  decreaseItemQty(itemId: number, qty = 1): void {
    if (
      this.itemsQuantities$[itemId] &&
      this.itemsQuantities$[itemId].getValue() - qty >= 0
    ) {
      this.itemsQuantities$[itemId].next(
        this.itemsQuantities$[itemId].getValue() - qty
      );
    }
  }
}
