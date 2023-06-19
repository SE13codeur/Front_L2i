import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev as environment } from '@env/environment.dev';
import { AuthState } from '@auth/store/auth.state';
import { Store } from '@ngxs/store';
import { IUser } from '@models/index';
import { Login } from '@auth/store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemsUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private store: Store) {
    console.log('register initialized');
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.itemsUrl}/login`, credentials);
  }

  register(user: IUser) {
    return this.http.post(`${this.itemsUrl}/register`, user);
  }

  dispatchLoginAction(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.store.dispatch(new Login(credentials));
  }

  getUsername(): Observable<string | null> {
    return this.store.select(AuthState.getUsername);
  }
}
