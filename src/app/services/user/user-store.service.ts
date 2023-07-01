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
import { Observable, ignoreElements, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  @Select(UserState.getUser) user$!: Observable<IUser>;
  @Select(UserState.isFavoriteItem) favoriteItems$!: Observable<number[]>;

  constructor(
    private store: Store,
    private checkAuthService: CheckAuthService
  ) {}

  getUser(): Observable<IUser> {
    return this.store.select((state) => state.user);
  }

  setUser(user: IUser) {
    this.store.dispatch(new SetUser(user));
  }

  addToFavorites(item: IItem): Observable<void> {
    if (this.checkAuthService.checkAuthenticationAndRedirect()) {
      return of(item).pipe(
        tap((item) => this.store.dispatch(new AddToFavoriteItems(item))),
        ignoreElements()
      );
    }
    return of(undefined);
  }

  removeFromFavorites(itemId: number): Observable<void> {
    if (this.checkAuthService.checkAuthenticationAndRedirect()) {
      return of(itemId).pipe(
        tap((item) => this.store.dispatch(new RemoveFromFavoriteItems(item))),
        ignoreElements()
      );
    }
    return of();
  }

  getFavoriteItems(): Observable<number[]> {
    return this.store.select((state) => state.user.favoriteItems);
  }

  isFavoriteItem(item: IItem): Observable<boolean> {
    return this.store
      .select((state) => state.user.favoriteItems)
      .pipe(map((favoriteItems) => favoriteItems.includes(item)));
  }

  toggleFavorite(item: IItem) {
    this.isFavoriteItem(item).subscribe((isFavorite) => {
      if (isFavorite) {
        this.store.dispatch(new RemoveFromFavoriteItems(item.id));
      } else {
        this.store.dispatch(new AddToFavoriteItems(item));
      }
    });
  }
}
