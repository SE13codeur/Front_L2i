import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CartComponent } from './components';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, SharedModule, MatIconModule, MatLabel],
  exports: [CartComponent],
})
export class CartModule {}
