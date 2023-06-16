import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AccountCustomerDrawerComponent,
  AdminItemComponent,
  AsideComponent,
  CartComponent,
  CartItemQuantityComponent,
  DetailItemComponent,
  FiltersItemComponent,
  HeaderComponent,
  ListItemWithoutMeilisearchComponent,
  NavComponent,
  OrderComponent,
  SearchItemComponent,
  SectionComponent,
} from '@components/index';
import {
  DetailItemPageComponent,
  HomePageComponent,
  ItemPageComponent,
  NotFoundPageComponent,
  PaymentPageComponent,
  SignPageComponent,
  UserAccountPageComponent,
} from '@pages/index';
import { AuthService, CartService, PaginatorFrService } from '@services/index';
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

import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import {} from '@store/order';
import { ProfileUserComponent } from './components/user/profile-user/profile-user.component';
import { OrderUserComponent } from './components/user/order-user/order-user.component';
import { FavoriteUserComponent } from './components/user/favorite-user/favorite-user.component';
import { ReleaseLatestPageComponent } from './pages/release/release-latest/release-latest-page.component';
import { PromosPageComponent } from './pages/promos/promos-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SignPageComponent,
    NavComponent,
    SectionComponent,
    DetailItemComponent,
    NotFoundPageComponent,
    ItemPageComponent,
    CartComponent,
    AsideComponent,
    SearchItemComponent,
    FiltersItemComponent,
    AdminItemComponent,
    ListItemWithoutMeilisearchComponent,
    CartItemQuantityComponent,
    DetailItemPageComponent,
    PaymentPageComponent,
    OrderComponent,
    AccountCustomerDrawerComponent,
    UserAccountPageComponent,
    ProfileUserComponent,
    OrderUserComponent,
    FavoriteUserComponent,
    ReleaseLatestPageComponent,
    PromosPageComponent,
  ],
  imports: [
    BrowserModule,
    NgxsStoreModule,
    NgxsModule.forRoot([CartState, OrderState]),
    NgxsStoragePluginModule.forRoot({ key: ['cart', 'orders'] }),
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    CartService,
    AuthService,
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorFrService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
