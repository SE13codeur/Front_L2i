import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { IOrder, OrderStatus } from '@models/index';
import { AddOrder, GetOrderStatus, UpdateOrderStatus } from './order.action';
import { Observable } from 'rxjs';

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

  static getStatusByOrderNumber(orderNumber: string) {
    return createSelector([OrderState], (state: OrderStateModel) => {
      const statusObject = state.orderStatuses.find(
        (statusObj) => statusObj.orderNumber === orderNumber
      );
      return statusObject ? statusObject.orderStatus : null;
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

  @Action(GetOrderStatus)
  getOrderStatus(
    { getState, patchState }: StateContext<OrderStateModel>,
    { orderNumber, currentStatus }: GetOrderStatus
  ) {
    const state = getState();
    const orderStatuses = [...state.orderStatuses];
    const statusIndex = orderStatuses.findIndex(
      (statusObj) => statusObj.orderNumber === orderNumber
    );

    if (statusIndex !== -1) {
      orderStatuses[statusIndex] = { orderNumber, orderStatus: currentStatus };
    } else {
      orderStatuses.push({
        orderNumber,
        orderStatus: currentStatus as Observable<string>,
      });
    }

    patchState({ orderStatuses });
  }
}
