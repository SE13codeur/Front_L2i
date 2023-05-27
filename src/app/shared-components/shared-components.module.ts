import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // import MatIconModule here

import {
  AsideComponent,
  CartButtonComponent,
  NavComponent,
  SearchItemComponent,
} from '@shared/components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    AsideComponent,
    CartButtonComponent,
    NavComponent,
    SearchItemComponent,
  ],
  imports: [
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatSliderModule,
    NgxSliderModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  exports: [AsideComponent, NavComponent, SearchItemComponent],
})
export class SharedComponentsModule {}
