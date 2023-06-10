import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AdminItemComponent,
  AsideComponent,
  CartComponent,
  CartItemQuantityComponent,
  DetailItemComponent,
  FiltersItemComponent,
  HeaderComponent,
  ListItemWithoutMeilisearchComponent,
  NavComponent,
  SearchItemComponent,
  SectionComponent,
} from '@components/index';
import {
  DetailItemPageComponent,
  HomePageComponent,
  ItemPageComponent,
  NotFoundPageComponent,
  PaymentPageComponent,
} from '@pages/index';
import { AuthService, CartService, PaginatorFrService } from '@services/index';

import { CartState, NgxsStoreModule, OrderState } from './store';
import { AuthModule } from './auth';

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
    CartComponent,
    AsideComponent,
    SearchItemComponent,
    FiltersItemComponent,
    AdminItemComponent,
    ListItemWithoutMeilisearchComponent,
    CartItemQuantityComponent,
    DetailItemPageComponent,
    PaymentPageComponent,
  ],
  imports: [
    BrowserModule,
    NgxsStoreModule,
    AuthModule,
    NgxsModule.forRoot([CartState, OrderState]),
    NgxsStoragePluginModule.forRoot({ key: ['cart', 'orders', 'auth'] }),
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
