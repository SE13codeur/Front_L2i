import { Injectable } from '@angular/core';
import { ICartItem, IItem } from '@models/index';
import { Store } from '@ngxs/store';
import { CartState } from '@store/cart/cart.state';
import {
  AddToCart,
  UpdateCartItemQuantity,
  RemoveFromCart,
  ClearCart,
} from '@store/index';
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
      description: item.description,
      imageUrl: item.imageUrl,
      regularPrice: item.regularPrice,
      quantity,
      subtitle: item.subtitle,
      quantityInStock: item.quantityInStock,
      totalSales: item.totalSales,
      authors: item.authors,
      editor: item.editor,
      category: item.category,
      pages: item.pages,
      year: item.year,
      version: item.version,
      tva: item.tva,
    };

    this.store.dispatch(new AddToCart(cartItem));
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): void {
    this.store.dispatch(new UpdateCartItemQuantity(itemId, newQuantity));
  }

  getTotalItems(): Observable<number> {
    return this.store.select(CartState.getCartTotalItems);
  }

  removeItemFromCart(itemId: number) {
    this.store.dispatch(new RemoveFromCart(itemId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }

  getTotalTTC(): Observable<number> {
    return this.store.select(CartState.getTotalTTC);
  }
}
