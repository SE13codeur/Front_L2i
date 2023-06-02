import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { IItem } from '@models/index';
import { Store } from '@ngxs/store';

import { CartItemQuantityService } from '@services/cart';
import { CartState } from '@store/index';

@Component({
  selector: 'app-cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.css'],
})
export class CartItemQuantityComponent implements OnInit {
  @ViewChild('quantitySelect') quantitySelect!: MatSelect;

  @Input() item: IItem | undefined;
  @Input() items: IItem[] = [];
  @Input() includeZero: boolean | undefined;
  isInCart: boolean | undefined;

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  selectedQuantity: number = 0;

  constructor(
    private store: Store,
    private cartItemQuantityService: CartItemQuantityService
  ) {}

  ngOnInit(): void {
    if (this.item) {
      this.cartItemQuantityService
        .getCartItemQuantity(this.item.id)
        .subscribe((quantity) => {
          this.selectedQuantity = quantity;
        });

      // Get the isInCart function
      const isInCartFunc = this.store.selectSnapshot(CartState.isInCart);

      // Call the function with item id to check if the item is in the cart
      this.isInCart = isInCartFunc(this.item.id);
    }
  }

  changeItemQuantity(event: any): void {
    if (this.item) {
      const newQuantity = event.value;
      this.cartItemQuantityService.changeCartItemQuantity(
        this.item.id,
        newQuantity
      );
    }
  }

  openSelect(): void {
    this.quantitySelect.open();
  }

  addToCart(item: IItem | undefined, event: Event) {
    if (item) {
      event.stopPropagation();
      this.cartItemQuantityService.changeCartItemQuantity(item.id, 1);
      this.openSelect();
    }
  }
}
