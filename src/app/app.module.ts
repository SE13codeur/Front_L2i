import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignPageComponent } from './pages/sign/sign-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { SectionComponent } from './components/section/section.component';
import { HttpClientModule } from '@angular/common/http';
import { ListItemComponent } from './components/item/list-item/list-item.component';
import { DetailItemComponent } from './components/item/detail-item/detail-item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ItemCategoryNavComponent } from './components/nav/item-category-nav/item-category-nav.component';
import { ItemPageComponent } from './pages/item/item-page.component';
import { CartComponent } from './components/aside/cart/cart.component';
import { AsideComponent } from './components/aside/aside.component';
import { CartService } from './services/cart.service';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    ItemCategoryNavComponent,
    ItemPageComponent,
    CartComponent,
    AsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
