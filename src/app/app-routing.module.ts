import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminItemComponent } from '@components/index';
import {
  DetailItemPageComponent,
  HomePageComponent,
  ItemPageComponent,
  SignPageComponent,
  NotFoundPageComponent,
  PaymentPageComponent,
  ReleaseLatestPageComponent,
  PromosPageComponent,
  OrderUserPageComponent,
  FavoritesUserPageComponent,
  ProfileUserPageComponent,
} from '@pages/index';
import { OrderActivateCartGuard } from './guards';

const routes: Routes = [
  { path: 'sign-in', component: SignPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'items/books', component: ItemPageComponent },
  { path: 'items/books/new', component: ReleaseLatestPageComponent },
  { path: 'items/books/promos', component: PromosPageComponent },
  // { path: 'items/books/comment', component: CommentsPageComponent },
  { path: 'items/books/:id', component: DetailItemPageComponent },
  // {
  //   path: 'items/books',
  //   component: ItemPageComponent,
  //   children: [
  //     { path: 'new', component: ReleaseLatestPageComponent },
  //     { path: 'promos', component: PromosPageComponent },
  //     { path: ':id', component: DetailItemPageComponent },
  //     // { path: 'comments', component: CommentItemPageComponent },
  //   ],
  // },

  // {
  //   path: 'user/account',
  //   component: UserAccountPageComponent,
  //   children: [
  //     { path: 'profile', component: ProfileUserComponent },
  //     { path: 'orders', component: OrderUserComponent },
  //     { path: 'favorites', component: FavoriteUserComponent },
  //   ],
  // },
  {
    path: 'items/orders',
    component: PaymentPageComponent,
    canActivate: [OrderActivateCartGuard],
  },
  { path: 'items/orders/:username', component: OrderUserPageComponent },
  {
    path: 'account/user/profile',
    component: ProfileUserPageComponent,
  },
  // {
  //   path: 'iaccount/user/comments',
  //   component: CommentsUserPageComponent,
  // },
  {
    path: 'account/user/favorites',
    component: FavoritesUserPageComponent,
  },
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
