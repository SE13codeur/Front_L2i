import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminItemComponent } from '@c/admin/admin-item/admin-item.component';
import { CartComponent } from '@c/aside/cart/cart.component';
import { DetailItemPageComponent } from '@p/detail-item/detail-item-page.component';
import { HomePageComponent } from '@p/home/home-page.component';
import { ItemPageComponent } from '@p/item/item-page.component';
import { NotFoundComponent } from '@p/not-found/not-found.component';
import { SignPageComponent } from '@p/sign/sign-page.component';

const routes: Routes = [
  { path: 'sign-in', component: SignPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'items/books', component: ItemPageComponent },
  { path: 'items/books/:id', component: DetailItemPageComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'admin/items/books',
    component: AdminItemComponent,
    // canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/items/books/:id',
    component: AdminItemComponent,
    // canActivate: [AdminAuthGuard],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
