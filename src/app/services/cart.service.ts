import { BehaviorSubject } from 'rxjs';
import { ICartItem } from '../models/ICartItem';
export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(this.cartItems);
  cartItems$: BehaviorSubject<ICartItem[]> = new BehaviorSubject<ICartItem[]>(
    []
  );
  isCartDrawerOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  toggleCart(): boolean {
    const newValue = !this.isCartDrawerOpen$.value;
    this.isCartDrawerOpen$.next(newValue);
    return newValue;
  }

  closeCart(): boolean {
    const newValue = this.isCartDrawerOpen$.value;
    this.isCartDrawerOpen$.next(newValue);
    return newValue;
  }

  getTotalCartItemsCount(): BehaviorSubject<number> {
    const itemCountSubject = new BehaviorSubject<number>(0);
    this.cartItemsSubject.subscribe((cartItems) => {
      const count = cartItems.reduce(
        (total, item) => total + item.quantity$.value,
        0
      );
      itemCountSubject.next(count);
    });
    return itemCountSubject;
  }

  addItem(item: ICartItem): void {
    const itemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.isbn13 === item.isbn13
    );
    if (itemIndex > -1) {
      this.cartItems[itemIndex].quantity$.next(
        this.cartItems[itemIndex].quantity$.value + item.quantity$.value
      );
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity$.value,
      0
    );
  }

  increaseItemQty(item: ICartItem): void {
    const itemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.isbn13 === item.isbn13
    );
    if (itemIndex > -1) {
      this.cartItems[itemIndex].quantity$.next(
        this.cartItems[itemIndex].quantity$.value + 1
      );
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  decreaseItemQty(item: ICartItem): void {
    const itemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.isbn13 === item.isbn13
    );
    if (itemIndex > -1) {
      this.cartItems[itemIndex].quantity$.next(
        this.cartItems[itemIndex].quantity$.value - 1
      );
      if (this.cartItems[itemIndex].quantity$.value === 0) {
        this.cartItems.splice(itemIndex, 1);
      }
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeItem(item: ICartItem): void {
    const itemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.isbn13 === item.isbn13
    );
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}
