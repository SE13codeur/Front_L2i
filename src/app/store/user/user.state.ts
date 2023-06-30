import { Injectable } from '@angular/core';
import { IUser } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddToFavoriteItems,
  InitUser,
  RemoveFromFavoriteItems,
  SetUser,
} from './user.action';
import { map } from 'rxjs';
import { AuthService } from '@auth-s/index';

export interface UserStateModel {
  user: IUser | undefined;
  favoriteItems: number[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
    favoriteItems: [],
  },
})
@Injectable()
export class UserState {
  constructor(private authService: AuthService) {}

  @Action(InitUser)
  initUser(ctx: StateContext<UserStateModel>) {
    this.authService.user$.subscribe((user) => {
      if (user) {
        ctx.setState({
          ...ctx.getState(),
          user,
        });
      }
    });
  }

  @Selector()
  static getUser(state: IUser): IUser {
    return state;
  }

  @Selector()
  static isFavoriteItem(state: UserStateModel) {
    return (itemId: number) => state.favoriteItems.includes(itemId);
  }

  @Action(AddToFavoriteItems)
  addToFavoriteItems(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddToFavoriteItems
  ) {
    patchState({
      favoriteItems: [...getState().favoriteItems, payload],
    });
  }

  @Action(RemoveFromFavoriteItems)
  removeFromFavoriteItems(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: RemoveFromFavoriteItems
  ) {
    patchState({
      favoriteItems: getState().favoriteItems.filter((id) => id !== payload),
    });
  }
}
