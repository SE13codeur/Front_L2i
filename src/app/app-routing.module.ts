import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailItemComponent } from '@c/section/item/detail-item/detail-item.component';
import { CartComponent } from '@c/aside/cart/cart.component';
import { SignPageComponent } from '@p/sign/sign-page.component';
import { HomePageComponent } from '@p/home/home-page.component';
import { ItemPageComponent } from '@p/item/item-page.component';
import { NotFoundComponent } from '@p/not-found/not-found.component';

const routes: Routes = [
  { path: 'sign-in', component: SignPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'items', component: ItemPageComponent },
  { path: 'items/:id', component: DetailItemComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
