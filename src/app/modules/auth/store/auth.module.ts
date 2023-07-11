import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AuthRoutingModule } from '../auth-routing.module';
import { AuthState } from './auth.state';
import { LoginComponent, RegisterComponent } from '@auth-c/index';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [AuthRoutingModule, LoginComponent, RegisterComponent],
})
export class AuthModule {}
