import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { ICustomer, IOrder } from '@models/index';
import { Injectable } from '@angular/core';
import { ClearUser, GetOrdersByUserId, SetUser } from './user.action';
import { tap } from 'rxjs';
import { OrderService } from '@services/index';

export interface UserStateModel {
  user: ICustomer | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class UserState {
  constructor(private orderService: OrderService) {}

  @Selector()
  static getUser(state: ICustomer): ICustomer {
    return state;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<ICustomer>, { payload }: SetUser) {
    ctx.setState(payload);
  }

  @Action(GetOrdersByUserId)
  getOrdersByUserId(ctx: StateContext<IOrder[]>, action: GetOrdersByUserId) {
    return this.orderService.getOrdersByUserId(action.userId).pipe(
      tap((orders) => {
        ctx.setState(orders);
      })
    );
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      user: undefined,
    });
  }
}
