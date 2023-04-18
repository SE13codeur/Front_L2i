import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignPageComponent } from '@p/sign/sign-page.component';
import { HomePageComponent } from '@p/home/home-page.component';
import { NotFoundComponent } from '@p/not-found/not-found.component';
import { ItemPageComponent } from '@p/item/item-page.component';

import { NavComponent } from '@c/nav/nav.component';
import { AsideComponent } from '@c/aside/aside.component';
import { CartComponent } from '@c/aside/cart/cart.component';
import { HeaderComponent } from '@c/header/header.component';
import { SectionComponent } from '@c/section/section.component';
import { SearchItemComponent } from '@c/nav/search-item/search-item.component';
import { ListItemComponent } from '@c/section/item/list-item/list-item.component';
import { DetailItemComponent } from '@c/section/item/detail-item/detail-item.component';

import { CartService } from '@s/cart.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersItemComponent } from '@c/section/filters-item/filters-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    SignPageComponent,
    NavComponent,
    SectionComponent,
    ListItemComponent,
    DetailItemComponent,
    NotFoundComponent,
    ItemPageComponent,
    CartComponent,
    AsideComponent,
    SearchItemComponent,
    FiltersItemComponent,
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
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
