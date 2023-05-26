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
  itemsQuantitiesByCard$: BehaviorSubject<number>;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  selectedQty: number = 0;

  constructor(private cartButtonService: CartButtonService) {
    this.itemsQuantitiesByCard$ = new BehaviorSubject<number>(0);
  }

  ngOnInit(): void {
    if (this.item) {
      this.cartButtonService
        .getItemQuantity(this.item.id)
        .subscribe((quantity) => {
          this.itemsQuantitiesByCard$.next(quantity);
          this.selectedQty = quantity;
        });
    }
  }

  changeItemQty(newQty: number): void {
    if (this.item) {
      const currentQty = this.itemsQuantitiesByCard$.getValue();
      if (newQty > currentQty) {
        this.cartButtonService.increaseItemQty(
          this.item.id,
          newQty - currentQty
        );
      }
      if (newQty < currentQty) {
        this.cartButtonService.decreaseItemQty(
          this.item.id,
          currentQty - newQty
        );
      }
    }
  }

  get isMinusButtonDisabled(): boolean {
    return this.itemsQuantitiesByCard$.getValue() === 0;
  }

  get isPlusButtonDisabled(): boolean {
    let qty = 0;
    this.itemsQuantitiesByCard$?.pipe(take(1)).subscribe((quantity) => {
      qty = quantity;
    });
    return qty >= 7;
  }
}
