import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetDrawerCartIsVisible } from './app.action';

export interface AppStateModel {
  drawerCartIsVisible: boolean;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    drawerCartIsVisible: true,
  },
  children: [CartState],
})
@Injectable()
export class AppState {
  constructor() {}

  @Selector()
  public static drawerCartIsVisible(state: AppStateModel) {
    return state.drawerCartIsVisible;
  }

  @Action(SetDrawerCartIsVisible)
  public setSideNavMenuIsVisible(
    ctx: StateContext<AppStateModel>,
    action: SetDrawerCartIsVisible
  ): void {
    ctx.patchState({ drawerCartIsVisible: action?._value });
  }
}
