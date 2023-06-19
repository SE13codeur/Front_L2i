import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ICustomer } from '@models/index';
import { Injectable } from '@angular/core';
import { ClearUser, SetUser } from './user.action';

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
  @Selector()
  static getUser(state: ICustomer): ICustomer {
    return state;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<ICustomer>, { payload }: SetUser) {
    ctx.setState(payload);
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      user: undefined,
    });
  }
}
