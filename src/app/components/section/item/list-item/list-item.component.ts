import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { MeiliSearchService } from '@s/meilisearch.service';
import { FiltersService } from '@s/filters.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  itemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);
  private originalItemList: IMeilisearchItem[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meiliSearchService: MeiliSearchService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    // Subscribe to the categories changes in FiltersService
    this.filtersService.categoriesSource
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const query = params['q'];
        if (query) {
          this.meiliSearchService
            .updatedSearch(query)
            .subscribe((searchResults) => {
              this.originalItemList = searchResults;
              this.applyFilters();
            });
        }
        if (!query) {
          this.meiliSearchService.getAllItems().subscribe((allBooks) => {
            this.originalItemList = allBooks;
            this.applyFilters();
          });
        }
      });

    this.filtersService.subscribeToAllFilters(
      () => this.applyFilters(),
      this.destroy$
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  applyFilters() {
    // Apply all filters to the originalItemList and update itemList$
    let filteredItems = this.originalItemList;

    // Apply categories filter
    const categories = this.filtersService.categoriesSource.getValue();
    if (categories.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        categories.includes(item.category.id)
      );
    }

    // Apply priceMin and priceMax filters
    const priceMin = this.filtersService.priceMinSource.getValue();
    const priceMax = this.filtersService.priceMaxSource.getValue();
    filteredItems = filteredItems.filter(
      (item) => item.regularPrice >= priceMin && item.regularPrice <= priceMax
    );

    // Apply yearMin and yearMax filters
    const yearMin = Number(this.filtersService.yearMinSource.getValue());
    const yearMax = Number(this.filtersService.yearMaxSource.getValue());
    filteredItems = filteredItems.filter(
      (item) => Number(item.year) >= yearMin && Number(item.year) <= yearMax
    );

    // Apply ratings filter
    const ratings = this.filtersService.ratingsSource.getValue();
    if (ratings.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        ratings.includes(Math.round(item.rating || 0))
      );
    }

    // Update itemList$ with filteredItems
    this.itemList$.next(filteredItems);
  }

  openItemDetails(item: IMeilisearchItem) {
    this.router.navigate(['/items', item.id]);
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  //TODO
  addToFavorites(item: IMeilisearchItem, event: Event) {
    console.log('Item added to favorites:', item);
    event.stopPropagation();
  }

  addToCart(item: IMeilisearchItem, event: Event) {
    console.log('Item added to cart:', item);
    event.stopPropagation();
  }
}
