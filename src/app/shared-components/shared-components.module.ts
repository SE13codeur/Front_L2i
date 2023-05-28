import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { AsideComponent } from '@c/aside/aside.component';
import { CartButtonComponent, SearchItemComponent } from '../shared/components';
import { NavComponent } from '@c/nav/nav.component';

@NgModule({
  declarations: [
    AsideComponent,
    CartButtonComponent,
    NavComponent,
    SearchItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  exports: [AsideComponent, NavComponent, SearchItemComponent],
})
export class SharedComponentsModule {}
export {
  AsideComponent,
  CartButtonComponent,
  NavComponent,
  SearchItemComponent,
};
