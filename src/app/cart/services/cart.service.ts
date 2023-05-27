import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ICartItem } from '@cart/models/ICartItem';
import IItem from 'src/app/item/models/IItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$ = new BehaviorSubject<ICartItem[]>([]);
  private taxRate = 0.2; // 20% Tax
  private shippingFee = 4.04; // Flat shipping fee

  constructor() {}

  getCartItem(): Observable<ICartItem[]> {
    return this.cart$.asObservable();
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
      quantity$: new BehaviorSubject<number>(quantity),
      description: item.description,
      image: item.imageUrl,
    };

    const currentCart = this.cart$.getValue();
    currentCart.push(cartItem);
    this.cart$.next(currentCart);
  }

  updateItemQuantity(index: number, quantity: number) {
    const currentCart = this.cart$.getValue();
    currentCart[index].quantity$.next(quantity);
    this.cart$.next(currentCart);
  }

  removeItemFromCart(index: number) {
    const currentCart = this.cart$.getValue();
    currentCart.splice(index, 1);
    this.cart$.next(currentCart);
  }

  clearCart() {
    this.cart$.next([]);
  }

  getSubTotal(): Observable<number> {
    return this.cart$.pipe(
      map((items) =>
        items.reduce(
          (total, item) => total + item.price * item.quantity$.getValue(),
          0
        )
      )
    );
  }

  getTotalTax(): Observable<number> {
    return this.getSubTotal().pipe(map((subtotal) => subtotal * this.taxRate));
  }

  getTotalItems(): number {
    const currentCart = this.cart$.getValue();
    return currentCart.reduce(
      (acc, item) => acc + item.quantity$.getValue(),
      0
    );
  }

  getTotalPrice(): number {
    const currentCart = this.cart$.getValue();
    return currentCart.reduce(
      (acc, item) => acc + item.price * item.quantity$.getValue(),
      0
    );
  }

  validateOrder(order: any): boolean {
    if (!order.shippingAddress || !order.billingAddress) {
      throw new Error('Missing shipping or billing address');
    }
    // TODO validate order with user infos or others validations as needed...
    return true;
  }

  // createOrder(customerInfo): Order {
  //   const order: Order

  //   this.clearCart();

  //   return order;
  // }

  // createInvoice(order: Order): Invoice {
  //     TODO with Back controller
  //   return invoice;
  // }
}
