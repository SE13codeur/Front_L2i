import { ICart } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddOrder, DeleteOrder, UpdateOrder } from './order.action';

export interface OrderStateModel {
  orders: ICart[];
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
}
