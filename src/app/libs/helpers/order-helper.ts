import { IOrder } from '@models/order';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export function extractOrderNumberAndStatus(orders: BehaviorSubject<IOrder[]>) {
  return orders.pipe(
    map((ordersArray) =>
      ordersArray.map((order) => ({
        orderNumber: order.orderNumber,
        orderStatus: order.status,
      }))
    )
  );
}
