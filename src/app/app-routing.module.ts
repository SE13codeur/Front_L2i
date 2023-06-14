import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminItemComponent,
  FavoriteUserComponent,
  OrderUserComponent,
  ProfileUserComponent,
} from '@components/index';
import {
  DetailItemPageComponent,
  HomePageComponent,
  ItemPageComponent,
  SignPageComponent,
  NotFoundPageComponent,
  PaymentPageComponent,
  UserAccountPageComponent,
} from '@pages/index';

const routes: Routes = [
  { path: 'sign-in', component: SignPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'items/books', component: ItemPageComponent },
  { path: 'items/books/:id', component: DetailItemPageComponent },
  {
    path: 'user/account',
    component: UserAccountPageComponent,
    children: [
      { path: 'profile', component: ProfileUserComponent },
      { path: 'orders', component: OrderUserComponent },
      { path: 'favorites', component: FavoriteUserComponent },
    ],
  },
  { path: 'items/orders', component: PaymentPageComponent },
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
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
