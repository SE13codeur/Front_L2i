import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { SignPageComponent } from './pages/sign/sign-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'sign-in', component: SignPageComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', component: 'pageNotFoundComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
