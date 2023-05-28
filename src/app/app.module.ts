import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DetailItemPageComponent,
  HomePageComponent,
  ItemPageComponent,
  NotFoundPageComponent,
  SignPageComponent,
} from '@pages/index';
import {
  AdminItemComponent,
  AsideComponent,
  CartButtonComponent,
  CartComponent,
  DetailItemComponent,
  FiltersItemComponent,
  HeaderComponent,
  ListItemWithoutMeilisearchComponent,
  NavComponent,
  SearchItemComponent,
  SectionComponent,
} from '@components/index';
import { AuthService, CartService, PaginatorFrService } from '@services/index';

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    CartButtonComponent,
    DetailItemPageComponent,
  ],
  imports: [
    BrowserModule,
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
