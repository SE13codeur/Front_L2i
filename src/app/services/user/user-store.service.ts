import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IUser } from '@models/index';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ClearUser, SetUser } from '@store/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userStore = new BehaviorSubject<IUser | null>(null);

  constructor(private store: Store, private http: HttpClient) {}

  setUser(user: IUser) {
    this.store.dispatch(new SetUser(user));
  }

  clearUser() {
    this.store.dispatch(new ClearUser());
  }

  getUser(): Observable<IUser> {
    return this.store.select((state) => state.user);
  }
}
