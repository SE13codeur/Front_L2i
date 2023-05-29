import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICartItem, IItem } from '@models/index';
import {
  AddToCart,
  UpdateCartItemQuantity,
  RemoveFromCart,
  ClearCart,
} from '@store/index';
import { CartState } from '@store/cart/cart.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private store: Store) {}

  getCartItems(): Observable<ICartItem[]> {
    return this.store.select(CartState.getCartItems);
  }

  addItemToCart(item: IItem, quantity: number): void {
    if (quantity > item.quantityInStock) {
      throw new Error('Quantity exceeds available stock');
    }

    const cartItem: ICartItem = {
      id: item.id,
      isbn13: item.isbn13,
      title: item.title,
      price: item.regularPrice,
      quantity,
      description: item.description,
      image: item.imageUrl,
    };

    this.store.dispatch(new AddToCart(cartItem));
  }

  removeItemFromCart(itemId: number) {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }

  getSubTotal(): Observable<number> {
    return this.store.select(CartState.getSubTotal);
  }

  getTotalPrice(): Observable<number> {
    return this.store.select(CartState.getTotalWithTaxes);
  }
}
