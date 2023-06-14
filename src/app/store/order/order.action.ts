import { ICart } from '@models/index';

export class AddOrder {
  static readonly type = '[Order] Add';
  constructor(public order: ICart) {}
}

export class GetOrders {
  static readonly type = '[Order] Get';
}

export class UpdateOrder {
  static readonly type = '[Order] Update';
  constructor(public order: ICart) {}
}

export class DeleteOrder {
  static readonly type = '[Order] Delete';
  constructor(public orderNumber: string) {}
}
