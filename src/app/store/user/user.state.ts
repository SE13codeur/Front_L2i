import { Injectable } from '@angular/core';
import { AuthService } from '@auth-s/index';
import { IItem, IUser } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddToFavoriteItems,
  InitUser,
  RemoveFromFavoriteItems,
  SetUser,
} from './user.action';
import { take } from 'rxjs';

export interface UserStateModel {
  user: IUser | undefined;
  favoriteItems: IItem[];
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
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        ctx.setState({
          ...ctx.getState(),
          user,
        });
      }
    });
  }

  @Action(SetUser)
  setUser({ patchState }: StateContext<UserStateModel>, { payload }: SetUser) {
    patchState({
      user: payload,
    });
  }

  @Selector()
  static getUser(state: UserStateModel): IUser | undefined {
    return state.user;
  }

  @Selector()
  static isFavoriteItem(state: UserStateModel) {
    return (item: IItem) => state.favoriteItems.includes(item);
  }

  @Action(AddToFavoriteItems)
  addToFavoriteItems(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddToFavoriteItems
  ) {
    const currentFavoriteItems = getState().favoriteItems;
    const isItemAlreadyFavorite = currentFavoriteItems.some(
      (item) => item.id === payload.id
    );

    if (!isItemAlreadyFavorite) {
      patchState({
        favoriteItems: [...currentFavoriteItems, payload],
      });
    }
  }

  @Action(RemoveFromFavoriteItems)
  removeFromFavoriteItems(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: RemoveFromFavoriteItems
  ) {
    patchState({
      favoriteItems: getState().favoriteItems.filter(
        (item) => item.id !== payload
      ),
    });
  }
}
