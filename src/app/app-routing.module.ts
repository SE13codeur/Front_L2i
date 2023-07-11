import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddressComponent,
  AdminItemComponent,
  AdminOrderComponent,
  AdminUserComponent,
  OrderListComponent,
} from '@components/index';
import { AuthGuard } from '@core/guards';
import {
  AdminUserPageComponent,
  DetailItemPageComponent,
  FavoritesUserPageComponent,
  HomePageComponent,
  ItemPageComponent,
  NotFoundPageComponent,
  PaymentPageComponent,
  ProfileUserPageComponent,
  PromosPageComponent,
  ReleaseLatestPageComponent,
} from '@pages/index';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/store/auth.module').then((m) => m.AuthModule),
  },
  { path: '', component: HomePageComponent },
  { path: 'items/books', component: ItemPageComponent },
  { path: 'items/books/new', component: ReleaseLatestPageComponent },
  { path: 'items/books/promos', component: PromosPageComponent },
  // { path: 'items/books/comment', component: CommentsPageComponent },
  { path: 'items/books/:id', component: DetailItemPageComponent },
  {
    path: 'items/payment',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'items/orders',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'items/orders/:id',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/user/profile',
    component: ProfileUserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/user/profile/address',
    component: AddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account/user/profile/address/:id',
    component: AddressComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'account/user/comments',
  //   component: CommentsUserPageComponent,
  //   canActivate: [AuthGuard],

  // },
  {
    path: 'account/user/favorites',
    component: FavoritesUserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/items/books',
    component: AdminItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/items/books/:id',
    component: AdminItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/orders/:id',
    component: AdminOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/user/list',
    component: AdminUserPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/users',
    component: AdminUserComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
