import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { IItem } from '@models/index';
import { Store } from '@ngxs/store';

import { CartItemQuantityService } from '@services/cart';
import { CartState } from '@store/index';
import { Subject, takeUntil } from 'rxjs';

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
  private destroy$ = new Subject<void>();

  constructor(private cartItemQuantityService: CartItemQuantityService) {}

  ngOnInit(): void {
    if (this.item) {
      this.cartItemQuantityService
        .getCartItemQuantity(this.item.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((quantity) => {
          this.selectedQuantity = quantity;

          // Check if the item is in the cart
          this.isInCart = quantity > 0;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeItemQuantity(event: any): void {
    if (this.item) {
      const newQuantity = event.value;
      this.cartItemQuantityService.changeCartItemQuantity(
        this.item.id,
        newQuantity
      );
      if (newQuantity == 0) {
        this.isInCart = false;
      } else {
        this.isInCart = true;
      }
      this.selectedQuantity = newQuantity;
    }
  }

  openSelect(): void {
    this.quantitySelect?.open();
  }

  addToCart(item: IItem, event: Event) {
    if (item) {
      event.stopPropagation();
      this.cartItemQuantityService.changeCartItemQuantity(item.id, 0);
      this.isInCart = true;
      setTimeout(() => {
        this.openSelect();
      }, 0);
    }
  }
}
