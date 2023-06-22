import { IOrder, OrderStatus } from '@models/index';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddOrder, UpdateOrderStatus } from './order.action';

export interface OrderStateModel {
  orders: IOrder[];
  orderStatuses: { orderNumber: string; orderStatus: Observable<string> }[];
}

@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: [],
    orderStatuses: [],
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
