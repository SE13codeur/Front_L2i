import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/modules/auth/components/index';
import { NgxsModule } from '@ngxs/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthState } from './auth.state';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [AuthRoutingModule, LoginComponent],
})
export class AuthModule {}
