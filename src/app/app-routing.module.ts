import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailItemComponent } from './components/item/detail-item/detail-item.component';
import { SignPageComponent } from './pages/sign/sign-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { ItemPageComponent } from './pages/item/item-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CartComponent } from './components/aside/cart/cart.component';

const routes: Routes = [
  { path: 'sign-in', component: SignPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'item', component: ItemPageComponent },
  { path: 'item/:isbn13', component: DetailItemComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
