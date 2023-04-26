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
  private originalItemList: IMeilisearchItem[] = [];

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
        if (query) {
          this.meiliSearchService
            .updatedSearch(query)
            .subscribe((searchResults) => {
              this.originalItemList = searchResults.hits;
              this.totalItems$.next(searchResults.totalItems);
              this.applyFilters();
            });
        }
        if (!query) {
          this.meiliSearchService
            .getItemsByPage(this.currentPage, this.itemsPerPage)
            .subscribe((allItems) => {
              this.originalItemList = allItems;
              this.totalItems$.next(allItems.length);
              this.applyFilters();
            });
        }
      });

    this.filtersService.subscribeToAllFilters(
      () => this.applyFilters(),
      this.destroy$
    );
    this.loadData();
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

    console.log(
      'Original categories:',
      filteredItems.map((item) => item.category)
    );

    // Apply categories filter
    const categories = this.filtersService.categoriesSource.getValue();
    if (categories.length > 0) {
      filteredItems = filteredItems.filter((item) => {
        return categories.includes(item.category.id);
      });
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
    console.log('Filtered items:', filteredItems);
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  openItemDetails(item: IMeilisearchItem) {
    this.router.navigate(['/items', item.id]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;

    this.loadData();
  }

  loadData() {
    // Data of current page and quantity of items by page
    this.meiliSearchService
      .updatedSearch('', '', {
        page: this.currentPage,
        itemsPerPage: this.itemsPerPage,
      })
      .subscribe(({ hits, totalItems }) => {
        this.itemList$.next(hits);
        this.totalItems$.next(totalItems);
      });
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
