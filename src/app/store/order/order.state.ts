import { IOrder } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddOrder, DeleteOrder, UpdateOrder } from './order.action';

export interface OrderStateModel {
  orders: IOrder[];
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

  @Action(UpdateOrder)
  update(
    { getState, setState }: StateContext<OrderStateModel>,
    { order }: UpdateOrder
  ) {
    const state = getState();
    const orderList = [...state.orders];
    const orderIndex = orderList.findIndex(
      (item) => item.orderNumber === order.orderNumber
    );
    orderList[orderIndex] = order;
    setState({
      ...state,
      orders: orderList,
    });
  }

  @Action(DeleteOrder)
  delete(
    { getState, setState }: StateContext<OrderStateModel>,
    { orderNumber }: DeleteOrder
  ) {
    const state = getState();
    const filteredArray = state.orders.filter(
      (item) => item.orderNumber !== orderNumber
    );
    setState({
      ...state,
      orders: filteredArray,
    });
  }
}
