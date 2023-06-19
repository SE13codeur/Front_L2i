import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess, LoginFailed, Logout } from './auth.action';
import { Role } from '@models/index';
import { AuthService } from '@auth-s/index';

export interface AuthStateModel {
  username: string | null;
  role: Role;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: null,
    role: Role.CUSTOMER,
    isAuthenticated: false,
    loading: false,
    error: null,
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
  static username(state: AuthStateModel): string | null {
    return state.username;
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
        ctx.dispatch(
          new LoginSuccess({ username: result.username, role: result.role })
        );
      }),
      catchError((error) => ctx.dispatch(new LoginFailed()))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      username: action.payload.username,
      role: action.payload.role,
      isAuthenticated: true,
      loading: false,
    });
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ loading: false, error: 'Login failed' });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Mettre à jour l'état pour indiquer que l'utilisateur est déconnecté
    ctx.patchState({ username: null, isAuthenticated: false });
  }
}
