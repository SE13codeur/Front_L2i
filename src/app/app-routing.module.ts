import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { SignPageComponent } from './pages/sign/sign-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'sign-in', component: SignPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'item/:isbn13', component: DetailItemComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
