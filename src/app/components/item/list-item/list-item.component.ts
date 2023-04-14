import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { MeiliSearchService } from '@s/meilisearch.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  // itemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);
  itemList$ = new ReplaySubject<IMeilisearchItem[]>(1);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meiliSearchService: MeiliSearchService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const query = params['q'];
        if (query) {
          this.meiliSearchService
            .updatedSearch(query)
            .subscribe((searchResults) => {
              this.itemList$.next(searchResults);
            });
        } else {
          this.meiliSearchService.getAllBooks().subscribe((allBooks) => {
            this.itemList$.next(allBooks);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openItemDetails(item: IMeilisearchItem) {
    this.router.navigate(['/items', item.isbn13]);
  }
}
