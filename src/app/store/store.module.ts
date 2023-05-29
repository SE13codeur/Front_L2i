import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';

import { environmentDev as env } from '@env/environment.dev';
import { AppState } from './app.state';
import { CartState } from './cart';

@NgModule({
  imports: [
    CommonModule,
    //NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      logger: console,
      collapsed: false,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({}),
    NgxsModule.forRoot([AppState, CartState], {
      developmentMode: !env.production,
    }),
  ],
  providers: [
    // TODO RAJOUTER UN LOGOUT PLUGIN
    //{
    //   provide: NGXS_PLUGINS,
    //   useValue: logoutPlugin,
    //   multi: true,
    // },
  ],
  exports: [
    //NgxsFormPluginModule,  //TODO FOR CONNEXION
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule,
    NgxsModule,
  ],
})
export class NgxsStoreModule {}
