import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminItemComponent,
  AdminOrderComponent,
  OrderListComponent,
} from '@components/index';
import {
  AdminAuthGuard,
  AuthGuard,
  OrderActivateCartGuard,
} from '@core/guards';
import {
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
    canActivate: [OrderActivateCartGuard],
  },
  {
    path: 'items/orders/:id',
    component: OrderListComponent,
  },
  {
    path: 'account/user/profile',
    component: ProfileUserPageComponent,
  },
  // {
  //   path: 'account/user/comments',
  //   component: CommentsUserPageComponent,
  // },
  {
    path: 'account/user/favorites',
    component: FavoritesUserPageComponent,
  },
  {
    path: 'admin/items/books',
    component: AdminItemComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/items/books/:id',
    component: AdminItemComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrderComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/orders/:id',
    component: AdminOrderComponent,
    canActivate: [AdminAuthGuard],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
