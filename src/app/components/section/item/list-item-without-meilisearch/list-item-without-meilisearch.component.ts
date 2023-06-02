import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IItem } from '@models/index';
import { Store } from '@ngxs/store';
import {
  CartItemQuantityService,
  FiltersService,
  ItemService,
  PaginationService,
} from '@services/index';
import { CartState } from '@store/index';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';

@Component({
  selector: 'app-list-item-without-meilisearch',
  templateUrl: './list-item-without-meilisearch.component.html',
  styleUrls: ['./list-item-without-meilisearch.component.css'],
})
export class ListItemWithoutMeilisearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() items: IItem[] = [];
  isInCart: ((id: number) => Observable<boolean>) | undefined;

  private originalItemList$ = new BehaviorSubject<IItem[]>([]);

  private readonly destroy$ = new Subject<void>();
  currentSearch: string = '';
  itemList$ = new BehaviorSubject<IItem[]>([]);
  totalItems$ = new BehaviorSubject<number | null>(null);
  itemsPerPage = 12;
  currentPage = 1;

  constructor(
    private itemService: ItemService,
    private filtersService: FiltersService,
    private paginationService: PaginationService,
    private router: Router,
    private cartItemQuantityService: CartItemQuantityService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((items) => {
      this.originalItemList$.next(items);
      this.itemList$.next(items);
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

  applyFilters() {
    // Apply all filters to the originalItemList and update itemList$
    let filteredItems = this.originalItemList$.getValue();

    // Apply search filter
    if (this.currentSearch) {
      filteredItems = filteredItems.filter((item: IItem) =>
        item.title.toLowerCase().includes(this.currentSearch.toLowerCase())
      );
    }

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

    // Update the totalItems$ BehaviorSubject
    this.totalItems$.next(filteredItems.length);

    return filteredItems;
  }

  updatePagination() {
    const filteredItems = this.applyFilters();

    // Paginate items
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    this.itemList$.next(paginatedItems);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.paginationService.updateCurrentPage(this.currentPage);
    this.itemsPerPage = event.pageSize;
    this.updatePagination();
  }

  getCurrentPageIndex(): number {
    let pageIndex = 0;
    this.paginationService.currentPage$.pipe(take(1)).subscribe(() => {
      pageIndex = this.currentPage - 1;
    });
    return pageIndex;
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  openItemDetails(item: IItem) {
    this.router.navigate(['/items/books', item.id]);
  }

  addToFavorites(item: IItem, event: Event) {
    console.log('Item added to favorites:', item);
    event.stopPropagation();
  }
}
