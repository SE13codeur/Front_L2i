import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  Login,
  LoginSuccess,
  LoginFailed,
  Logout,
  SetOpenCartAfterLogin,
  ResetOpenCartAfterLogin,
} from './auth.action';
import { Role } from '@models/index';
import { AuthService } from '@auth-s/index';
import { of } from 'rxjs';

export interface AuthStateModel {
  username: string | null;
  role: string;
  email: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: any;
  openCartAfterLogin: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: null,
    role: 'CUSTOMER',
    email: '',
    isAuthenticated: false,
    isAdmin: false,
    loading: false,
    error: null,
    openCartAfterLogin: false,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state.isAdmin;
  }

  @Selector()
  static getUsername(state: AuthStateModel): string | null {
    return state.username;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ loading: true });
    return this.authService.login(action.payload).pipe(
      tap((result: any) => {
        console.log(result);
        const username = result.username;
        const role =
          result.role && result.role.title ? result.role.title : 'CUSTOMER';
        const email = result.email;
        ctx.dispatch(
          new LoginSuccess({
            username,
            role,
            email,
          })
        );
      }),
      catchError((error) => {
        ctx.dispatch(new LoginFailed());
        return of(error);
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      username: action.payload.username,
      role: action.payload.role,
      email: action.payload.email,
      isAuthenticated: true,
      isAdmin: action.payload.role == 'ADMIN',
      loading: false,
    });
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false, error: 'Login failed' });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ username: null, isAuthenticated: false });
  }

  @Action(SetOpenCartAfterLogin)
  setOpenCartAfterLogin(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ openCartAfterLogin: true });
  }

  @Action(ResetOpenCartAfterLogin)
  resetOpenCartAfterLogin(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ openCartAfterLogin: false });
  }
}
