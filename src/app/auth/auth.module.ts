import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';
import { LoginComponent } from '@auth-c/index';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [AuthRoutingModule, LoginComponent],
})
export class AuthModule {}
