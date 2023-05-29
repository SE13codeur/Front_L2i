import { IItem } from '@models/item';

export class LoadItems {
  static readonly type = '[Item] Load Items';
}

export class LoadItem {
  static readonly type = '[Item] Load Item';
  constructor(public itemId: number) {}
}

export class UpdateItem {
  static readonly type = '[Item] Update Item';
  constructor(public item: IItem) {}
}

export class UpdateItemQuantityInStock {
  static readonly type = '[Cart] Update Item Quantity In Stock';
  constructor(public itemId: number, public selectedQuantity: number) {}
}
