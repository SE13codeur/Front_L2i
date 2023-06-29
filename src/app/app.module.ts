import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AccountUserButtonComponent,
  AccountUserDrawerComponent,
  AdminItemComponent,
  AsideComponent,
  CartComponent,
  CartItemQuantityComponent,
  DetailItemComponent,
  EventBannerComponent,
  FiltersItemComponent,
  FooterComponent,
  HeaderComponent,
  ListItemWithoutMeilisearchComponent,
  NavComponent,
  OrderComponent,
  OrderListComponent,
  SearchItemComponent,
  SectionComponent,
} from '@components/index';
import {
  DetailItemPageComponent,
  FavoritesUserPageComponent,
  HomePageComponent,
  ItemPageComponent,
  NotFoundPageComponent,
  OrderUserPageComponent,
  PaymentPageComponent,
  PromosPageComponent,
  ReleaseLatestPageComponent,
} from '@pages/index';
import {
  AdminAuthService,
  CartService,
  PaginatorFrService,
} from '@services/index';

import { CartState, NgxsStoreModule, OrderState } from './store';

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';

import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthState } from '@auth/index';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '@store/user/user.state';
import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { ProfileUserPageComponent } from './pages/user-account/profile-user-page/profile-user-page.component';
import { OrderStatusPipe } from '@libs/index';
import { AddressComponent } from './components/shared/address/address.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminUserPageComponent } from './pages/user-account/admin-user-page/admin-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    NavComponent,
    SectionComponent,
    DetailItemComponent,
    NotFoundPageComponent,
    ItemPageComponent,
    AsideComponent,
    CartComponent,
    SearchItemComponent,
    FiltersItemComponent,
    AdminItemComponent,
    ListItemWithoutMeilisearchComponent,
    CartItemQuantityComponent,
    DetailItemPageComponent,
    PaymentPageComponent,
    OrderComponent,
    AccountUserButtonComponent,
    ReleaseLatestPageComponent,
    PromosPageComponent,
    AccountUserDrawerComponent,
    OrderUserPageComponent,
    OrderListComponent,
    FavoritesUserPageComponent,
    ProfileUserPageComponent,
    AdminOrderComponent,
    OrderStatusPipe,
    EventBannerComponent,
    FooterComponent,
    AddressComponent,
    AdminUserComponent,
    AdminUserPageComponent,
  ],
  imports: [
    BrowserModule,
    NgxsStoreModule,
    NgxsModule.forRoot([CartState, OrderState, AuthState, UserState]),
    NgxsStoragePluginModule.forRoot({
      key: ['cart', 'orders', 'orderStatuses', 'auth', 'user'],
    }),
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    NgxSliderModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    CartService,
    AdminAuthService,
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorFrService,
    },
    // AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
