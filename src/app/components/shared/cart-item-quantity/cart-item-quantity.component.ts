import { Component, Input, OnInit } from '@angular/core';
import { IItem } from '@models/index';

import { CartItemQuantityService } from '@services/cart';

@Component({
  selector: 'app-cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.css'],
})
export class CartItemQuantityComponent implements OnInit {
  @Input() item: IItem | undefined;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  selectedQuantity: number = 0;

  constructor(private cartItemQuantityService: CartItemQuantityService) {}

  ngOnInit(): void {
    if (this.item) {
      this.cartItemQuantityService
        .getCartItemQuantity(this.item.id)
        .subscribe((quantity) => {
          this.selectedQuantity = quantity;
        });
    }
  }

  changeItemQuantity(newQuantity: number): void {
    if (this.item) {
      this.cartItemQuantityService.changeCartItemQuantity(
        this.item.id,
        newQuantity
      );
    }
  }
}
