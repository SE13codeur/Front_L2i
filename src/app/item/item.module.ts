import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  ItemPageComponent,
  DetailItemPageComponent,
  DetailItemComponent,
  FiltersItemComponent,
  ListItemWithoutMeilisearchComponent,
  PaginatorFrService,
} from './index';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { AuthService } from '@admin/index';

@NgModule({
  declarations: [
    ItemPageComponent,
    DetailItemPageComponent,
    DetailItemComponent,
    ListItemWithoutMeilisearchComponent,
    FiltersItemComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AuthService,
    {
      provide: MatPaginatorIntl,
      useClass: PaginatorFrService,
    },
  ],
  exports: [ItemPageComponent, DetailItemPageComponent],
})
export class ItemModule {}
