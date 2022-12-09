import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPageComponent } from './pages/sign-page/sign-page.component';

const routes: Routes = [{ path: 'sign-in', component: SignPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
