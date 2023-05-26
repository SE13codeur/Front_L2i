import { Component, Input, OnInit } from '@angular/core';
import { ICartItem } from '@m/ICartItem';
import IItem from '@m/IItem';
import { CartButtonService } from '@s/cart/cart-button.service';
import { BehaviorSubject, Observable, startWith, take } from 'rxjs';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent implements OnInit {
  @Input() item: IItem | undefined;
  itemQuantityByItemId$: BehaviorSubject<number>;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  selectedQty: number = 0;

  constructor(private cartButtonService: CartButtonService) {
    this.itemQuantityByItemId$ = new BehaviorSubject<number>(0);
  }

  ngOnInit(): void {
    if (this.item) {
      this.cartButtonService
        .getItemQuantityByCardForCart(this.item.id)
        .subscribe((quantity) => {
          this.itemQuantityByItemId$.next(quantity);
          this.selectedQty = quantity;
        });
    }
  }

  changeItemQty(newQty: number): void {
    if (this.item) {
      const currentQty = this.itemQuantityByItemId$.getValue();
      if (newQty > currentQty) {
        this.cartButtonService.increaseItemQuantity(
          this.item.id,
          newQty - currentQty
        );
      }
      if (newQty < currentQty) {
        this.cartButtonService.decreaseItemQuantity(
          this.item.id,
          currentQty - newQty
        );
      }
    }
  }
}
