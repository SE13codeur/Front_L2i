import { ICart, IOrder, OrderStatus } from '@models/index';
import { Observable } from 'rxjs';

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

export class UpdateOrderStatus {
  static readonly type = '[Order] Update Status';
  constructor(public orderNumber: string, public newStatus: OrderStatus) {}
}

export class GetOrderStatus {
  static readonly type = '[Order] Get Order Status';
  constructor(
    public orderNumber: string,
    public currentStatus: Observable<string>
  ) {}
}

export class SetOrderStatuses {
  static readonly type = '[Order] Set Order Statuses';
  constructor(
    public payload: { orderNumber: string; orderStatus: OrderStatus }[]
  ) {}
}

export class DeleteOrder {
  static readonly type = '[Order] Delete';
  constructor(public orderNumber: string) {}
}
