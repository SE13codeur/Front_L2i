import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Logout } from '@auth/store/auth.action';
import { AuthState } from '@auth/store/auth.state';
import { environmentDev as environment } from '@env/environment.dev';
import { IUser } from '@models/index';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemsUrl = `${environment.apiUrl}/auth`;
  private userStore = new BehaviorSubject<IUser | null>(null);
  public readonly user$ = this.userStore.asObservable();

  constructor(private http: HttpClient, private store: Store) {}

  login(credentials: {
    username: string;
    role: string;
    email: string;
  }): Observable<IUser> {
    return this.http.post<IUser>(`${this.itemsUrl}/login`, credentials).pipe(
      map((user) => {
        this.userStore.next(user);
        return user;
      })
    );
  }

  register(user: IUser) {
    return this.http.post(`${this.itemsUrl}/register`, user);
  }

  dispatchLoginAction(credentials: {
    username: string;
    role: string;
    email: string;
  }): Observable<any> {
    return this.store.dispatch(new Login(credentials));
  }

  dispatchLogoutAction(): Observable<any> {
    return this.store.dispatch(new Logout());
  }

  getUsername(): Observable<string | null> {
    return this.store.select(AuthState.getUsername);
  }
}
