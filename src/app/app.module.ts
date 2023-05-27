import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from '@p/home/home-page.component';
import { ItemPageComponent } from '@p/item/item-page.component';
import { NotFoundComponent } from '@p/not-found/not-found.component';
import { SignPageComponent } from '@p/sign/sign-page.component';

import { AdminItemComponent } from '@c/admin/admin-item/admin-item.component';
import { HeaderComponent } from '@c/header/header.component';
import { FiltersItemComponent } from '@c/section/filters-item/filters-item.component';
import { DetailItemComponent } from '@c/section/item/detail-item/detail-item.component';
import { ListItemWithoutMeilisearchComponent } from '@c/section/item/list-item-without-meilisearch/list-item-without-meilisearch.component';
import { SectionComponent } from '@c/section/section.component';
import { AsideComponent } from '@c/shared/aside/aside.component';
import { CartComponent } from '@c/shared/aside/cart/cart.component';
import { CartButtonComponent } from '@c/shared/cart-button/cart-button.component';
import { NavComponent } from '@c/shared/nav/nav.component';
import { SearchItemComponent } from '@c/shared/nav/search-item/search-item.component';

import { AuthService } from '@s/admin/auth.service';
import { CartService } from '@s/cart/cart.service';
import { PaginatorFrService } from '@s/pagination/paginator-fr-service.service';

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

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailItemPageComponent } from '@p/detail-item/detail-item-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SignPageComponent,
    NavComponent,
    SectionComponent,
    DetailItemComponent,
    NotFoundComponent,
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
