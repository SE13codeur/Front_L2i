import { Component, Input } from '@angular/core';
import { ICartItem } from '@m/ICartItem';
import { CartService } from '@s/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css'],
})
export class CartButtonComponent {
  @Input() item: ICartItem | undefined;
  quantity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private cartService: CartService) {}

  increaseItemQty(event: Event): void {
    event.stopPropagation();
    if (this.item) {
      this.cartService.increaseItemQty(this.item);
      let currentQuantity = this.quantity$.getValue();
      this.quantity$.next(currentQuantity + 1);
    }
  }

  decreaseItemQty(event: Event): void {
    event.stopPropagation();
    if (this.item) {
      this.cartService.decreaseItemQty(this.item);
      let currentQuantity = this.quantity$.getValue();
      this.quantity$.next(currentQuantity - 1);
    }
  }

  get isMinusButtonDisabled(): boolean {
    return this.quantity$.getValue() === 0;
  }
}
