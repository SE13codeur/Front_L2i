import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { SharedComponentsModule } from '@shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
    SharedComponentsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
    SharedComponentsModule,
  ],
})
export class SharedModule {}
