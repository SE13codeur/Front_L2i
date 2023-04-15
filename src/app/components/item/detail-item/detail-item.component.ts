import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { MeiliSearchService } from '@s/meilisearch.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  item$: Observable<IMeilisearchItem | null>;

  constructor(
    private route: ActivatedRoute,
    private meiliSearchService: MeiliSearchService,
    private location: Location
  ) {
    this.item$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) =>
        this.meiliSearchService.getItemById(id).pipe(catchError(() => of(null)))
      )
    );
  }

  ngOnInit(): void {}

  goBackToListItems(): void {
    this.location.back();
  }
}
