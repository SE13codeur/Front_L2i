import { BehaviorSubject } from 'rxjs';

export interface ICartItem {
  id: number;
  isbn13: string;
  title: string;
  price: number;
  quantity$: BehaviorSubject<number>;
  description?: string;
}

export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(this.cartItems);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItemCount(): BehaviorSubject<number> {
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
      (cartItem) => cartItem.id === item.id
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
      (cartItem) => cartItem.id === item.id
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
      (cartItem) => cartItem.id === item.id
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
      (cartItem) => cartItem.id === item.id
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
