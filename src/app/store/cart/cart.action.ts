import { ICartItem } from '@models/index';

export class AddToCart {
  static readonly type = '[Cart] Add item';
  constructor(public item: ICartItem) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove item';
  constructor(public itemId: number) {}
}
export class IncreaseCartItemQuantity {
  static readonly type = '[Cart] Increase quantity of one item';
  constructor(public itemId: number, public selectedQuantity: number) {}
}
export class DecreaseCartItemQuantity {
  static readonly type = '[Cart] Decrease quantity of one item';
  constructor(public itemId: number, public selectedQuantity: number) {}
}

export class UpdateCartItemQuantity {
  static readonly type = '[Cart] Update item quantity';
  constructor(public itemId: number, public quantity: number) {}
}

export class ClearCart {
  static readonly type = '[Cart] Clear';
}
