import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminItemComponent } from './index';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminItemComponent],
  imports: [CommonModule, SharedModule, MatIconModule],
  providers: [],
  exports: [AdminItemComponent],
})
export class AdminModule {}
