import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { FiltersService } from '@s/filters.service';
import { MeiliSearchService } from '@s/meilisearch.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  itemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);
  private originalItemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);

  private readonly destroy$ = new Subject<void>();
  totalItems$ = new BehaviorSubject<number | null>(null);
  itemsPerPage = 12;
  currentPage = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meiliSearchService: MeiliSearchService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const query = params['q'];

        if (!!query) {
          this.meiliSearchService
            .updatedSearch(query, '', {
              page: this.currentPage,
              itemsPerPage: this.itemsPerPage,
            })
            .subscribe(({ hits, totalItems }) => {
              this.itemList$.next(hits);
              this.totalItems$.next(totalItems);
            });
        }
        if (!query) {
          this.meiliSearchService.getAllItems().subscribe((allItems) => {
            this.originalItemList$.next(allItems);
            this.itemList$.next(this.originalItemList$.getValue());
            this.totalItems$.next(allItems.length);
            this.applyFilters();
            this.updatePagination();
          });
        }
      });

    this.filtersService.filtersUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.applyFilters();
        this.updatePagination();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  updatePagination() {
    const originalItems = this.originalItemList$.getValue();
    let paginatedItems = originalItems;

    // Apply filters before pagination
    paginatedItems = this.applyFilters();

    // Paginate items
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    paginatedItems = paginatedItems.slice(startIndex, endIndex);

    this.itemList$.next(paginatedItems);
    this.totalItems$.next(originalItems.length);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.updatePagination();
  }

  applyFilters() {
    // Apply all filters to the originalItemList and update itemList$
    let filteredItems = this.originalItemList$.getValue();

    // Apply categories filter
    const categories = this.filtersService.categoriesSource.getValue();
    if (categories.length > 0) {
      filteredItems = filteredItems.filter((item: any) => {
        return categories.includes(item.category.id);
      });
    }

    // Apply priceMin and priceMax filters
    const priceMin = this.filtersService.priceMinSource.getValue();
    const priceMax = this.filtersService.priceMaxSource.getValue();
    filteredItems = filteredItems.filter(
      (item: any) =>
        item.regularPrice >= priceMin && item.regularPrice <= priceMax
    );

    // Apply yearMin and yearMax filters
    const yearMin = Number(this.filtersService.yearMinSource.getValue());
    const yearMax = Number(this.filtersService.yearMaxSource.getValue());
    filteredItems = filteredItems.filter(
      (item: any) =>
        Number(item.year) >= yearMin && Number(item.year) <= yearMax
    );

    // Apply ratings filter
    const ratings = this.filtersService.ratingsSource.getValue();
    if (ratings.length > 0) {
      filteredItems = filteredItems.filter((item: any) =>
        ratings.includes(Math.round(item.rating || 0))
      );
    }

    // Update itemList$ with filteredItems
    this.itemList$.next(filteredItems);

    return this.itemList$.getValue();
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  openItemDetails(item: IMeilisearchItem) {
    this.router.navigate(['/items', item.id]);
  }

  addToFavorites(item: IMeilisearchItem, event: Event) {
    console.log('Item added to favorites:', item);
    event.stopPropagation();
  }

  addToCart(item: IMeilisearchItem, event: Event) {
    console.log('Item added to cart:', item);
    event.stopPropagation();
  }
}
