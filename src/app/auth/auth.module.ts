import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@auth-c/index';
import { NgxsModule } from '@ngxs/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthState } from './auth.state';

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
