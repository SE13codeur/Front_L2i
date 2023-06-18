import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { IOrder, OrderStatus } from '@models/index';
import { UpdateOrderStatus } from './order.action';

export interface OrderStateModel {
  orders: IOrder[];
}

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

@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: [],
  },
})
export class OrderState {
  @Selector()
  static getOrders(state: OrderStateModel) {
    return state.orders;
  }

  static getOrdersByStatus(status: OrderStatus) {
    return createSelector([OrderState], (state: OrderStateModel) => {
      return state.orders.filter((order) => order.status === status);
    });
  }

  @Action(AddOrder)
  add(
    { getState, patchState }: StateContext<OrderStateModel>,
    { order }: AddOrder
  ) {
    const state = getState();
    patchState({
      orders: [...state.orders, order],
    });
  }

  @Action(UpdateOrderStatus)
  updateOrderStatus(
    { getState, setState }: StateContext<OrderStateModel>,
    { orderNumber, newStatus }: UpdateOrderStatus
  ) {
    const state = getState();
    const orders = [...state.orders];
    const orderIndex = orders.findIndex(
      (order) => order.orderNumber === orderNumber
    );

    if (orderIndex !== -1) {
      orders[orderIndex] = { ...orders[orderIndex], status: newStatus };
      setState({
        ...state,
        orders,
      });
    }
  }
}
