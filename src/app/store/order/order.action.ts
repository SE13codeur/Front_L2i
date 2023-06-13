import { IOrder } from '@models/index';

export class AddOrder {
  static readonly type = '[Order] Add';
  constructor(public order: IOrder) {}
}

export class GetOrders {
  static readonly type = '[Order] Get';
}

export class UpdateOrder {
  static readonly type = '[Order] Update';
  constructor(public order: IOrder) {}
}

export class DeleteOrder {
  static readonly type = '[Order] Delete';
  constructor(public orderNumber: string) {}
}
