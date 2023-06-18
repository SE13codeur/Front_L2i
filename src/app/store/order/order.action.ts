import { ICart, IOrder, OrderStatus } from '@models/index';

export class AddOrder {
  static readonly type = '[Order] Add';
  constructor(public order: ICart) {}
}

export class GetOrders {
  static readonly type = '[Order] Get';
}

export class UpdateOrder {
  static readonly type = '[Order] Update';
  constructor(public order: IOrder) {}
}

export class UpdateOrderStatus {
  static readonly type = '[Order] Update Status';
  constructor(public orderNumber: string, public newStatus: OrderStatus) {}
}

export class DeleteOrder {
  static readonly type = '[Order] Delete';
  constructor(public orderNumber: string) {}
}
