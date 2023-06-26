import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { IUser, IOrder } from '@models/index';
import { Injectable } from '@angular/core';
import { ClearUser, GetOrdersByUserId, SetUser } from './user.action';
import { tap } from 'rxjs';
import { OrderService } from '@services/index';

export interface UserStateModel {
  user: IUser | undefined;
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
  static getUser(state: IUser): IUser {
    return state;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<IUser>, { payload }: SetUser) {
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
