import { Component, OnInit } from '@angular/core';
import { ICartItem } from '@models/cart';
import { CartButtonService, CartService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  itemsInCart: ICartItem[] = [];
  itemQuantitiesInCart: { [itemId: number]: number } = {};
  cartItems$: Observable<ICartItem[]> | undefined;
  totalItemsInCart$: Observable<number> | undefined;

  constructor(
    private cartService: CartService,
    private cartButtonService: CartButtonService
  ) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItem();
    this.totalItemsInCart$ = this.cartButtonService.getTotalItemsInCart();

    this.cartItems$.subscribe((items) => {
      this.itemsInCart = items;
      this.itemsInCart.forEach((item) => {
        this.cartButtonService
          .getQuantityByItemInCart(item.id)
          .subscribe((quantity) => {
            this.itemQuantitiesInCart[item.id] = quantity;
          });
      });
    });
  }

  increaseQuantity(itemId: number): void {
    this.cartButtonService.increaseItemQuantity(itemId);
  }

  decreaseQuantity(itemId: number): void {
    this.cartButtonService.decreaseItemQuantity(itemId);
  }

  removeItem(index: number): void {
    this.cartService.removeItemFromCart(index);
  }

  checkout(): void {
    // Logic for checking out goes here
    console.log('Checkout');
  }
}
