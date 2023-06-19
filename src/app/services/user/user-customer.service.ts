import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICustomer } from '@models/index';
import { Observable } from 'rxjs';
import { ClearUser, SetUser } from '@store/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private store: Store) {}

  setUser(user: ICustomer) {
    this.store.dispatch(new SetUser(user));
  }

  clearUser() {
    this.store.dispatch(new ClearUser());
  }

  getUser(): Observable<ICustomer> {
    return this.store.select((state) => state.user);
  }
}
