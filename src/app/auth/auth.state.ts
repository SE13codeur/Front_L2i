import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess, LoginFailed, Logout } from './auth.action';
import { AuthService } from '@auth-s/index';

export interface AuthStateModel {
  token: string | null;
  loading: boolean;
  error: any;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ loading: true });
    return this.authService.login(action.payload).pipe(
      tap((result: any) => ctx.dispatch(new LoginSuccess(result.token))),
      catchError((error) => ctx.dispatch(new LoginFailed()))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({ token: action.payload.token, loading: false });
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false, error: 'Login failed' });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ token: null });
  }
}
