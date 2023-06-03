import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IOrder } from '@models/index';
import { AddOrder, GetOrders, UpdateOrder, DeleteOrder } from './order.action';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  @Selector()
  static getOrders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(GetOrders)
  getOrders(ctx: StateContext<OrderStateModel>) {
    return this.http.get<IOrder[]>('your-api-endpoint').pipe(
      tap((orders: IOrder[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          orders: orders,
        });
      })
    );
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
