import { Injectable } from '@angular/core';
import { CheckAuthService } from '@auth-s/index';
import { IItem, IUser } from '@models/index';
import { Select, Store } from '@ngxs/store';
import {
  AddToFavoriteItems,
  RemoveFromFavoriteItems,
  SetUser,
  UserState,
} from '@store/user';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  @Select(UserState.getUser) user$!: Observable<IUser>;
  @Select(UserState.isFavoriteItem) favoriteItems$!: Observable<number[]>;

  constructor(
    private store: Store,
    private checkAuthhService: CheckAuthService
  ) {}

  getUser(): Observable<IUser> {
    return this.store.select((state) => state.user);
  }

  setUser(user: IUser) {
    this.store.dispatch(new SetUser(user));
  }

  addToFavorites(itemId: number) {
    if (this.checkAuthhService.checkAuthenticationAndRedirect()) {
      this.store.dispatch(new AddToFavoriteItems(itemId));
    }
  }

  getFavoriteItems(): Observable<number[]> {
    return this.store.select((state) => state.user.favoriteItems);
  }

  removeFromFavorites(itemId: number) {
    if (this.checkAuthhService.checkAuthenticationAndRedirect()) {
      this.store.dispatch(new RemoveFromFavoriteItems(itemId));
    }
  }

  isItemFavorite(itemId: number): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (user && user.favoriteItems) {
          return user.favoriteItems.includes(itemId);
        } else {
          return false;
        }
      })
    );
  }
}
