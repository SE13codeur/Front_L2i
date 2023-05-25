// import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BehaviorSubject, Subject, combineLatest, take, takeUntil } from 'rxjs';

// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import IMeilisearchItem from '@m/IItem';
// import { FiltersService } from '@s/search/filters.service';
// import { MeiliSearchService } from '@s/search/meilisearch.service';
// import { PaginationService } from '@s/pagination/pagination.service';

// @Component({
//   selector: 'app-list-item',
//   templateUrl: './list-item.component.html',
//   styleUrls: ['./list-item.component.css'],
// })
// export class ListItemComponent implements OnInit, OnDestroy {
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   private originalItemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);

//   private readonly destroy$ = new Subject<void>();
//   currentSearch: string = '';
//   itemList$ = new BehaviorSubject<IMeilisearchItem[]>([]);
//   totalItems$ = new BehaviorSubject<number | null>(null);
//   itemsPerPage = 12;
//   currentPage = 1;

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private meiliSearchService: MeiliSearchService,
//     private filtersService: FiltersService,
//     private paginationService: PaginationService
//   ) {}

//   ngOnInit() {
//     this.route.queryParams
//       .pipe(takeUntil(this.destroy$))
//       .subscribe((params) => {
//         const query = params['q'];
//         this.currentSearch = query || '';
//         if (!!query) {
//           this.meiliSearchService
//             .updatedSearch(query, '', {
//               page: this.currentPage,
//               itemsPerPage: this.itemsPerPage,
//             })
//             .subscribe(({ hits, totalItems }) => {
//               this.itemList$.next(hits);
//               this.totalItems$.next(totalItems);
//             });
//         }
//         if (!query) {
//           this.meiliSearchService.getAllItems().subscribe((allItems) => {
//             this.originalItemList$.next(allItems);
//             this.itemList$.next(this.originalItemList$.getValue());
//             this.totalItems$.next(allItems.length);
//             this.applyFilters();
//             this.updatePagination();
//           });
//         }
//       });

//     combineLatest([
//       this.filtersService.filtersUpdated$,
//       this.paginationService.currentPage$,
//     ])
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(([_, page]) => {
//         this.currentPage = page;
//         this.updatePagination();
//       });
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   truncateText(text: string, maxLength: number): string {
//     return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
//   }

//   applyFilters() {
//     // Apply all filters to the originalItemList and update itemList$
//     let filteredItems = this.originalItemList$.getValue();

//     // Apply search filter
//     if (this.currentSearch) {
//       filteredItems = filteredItems.filter((item: any) =>
//         item.title.toLowerCase().includes(this.currentSearch.toLowerCase())
//       );
//     }
//     // Apply categories filter
//     const categories = this.filtersService.categoriesSource.getValue();
//     if (categories.length > 0) {
//       filteredItems = filteredItems.filter((item: any) => {
//         return categories.includes(item.category.id);
//       });
//     }

//     // Apply priceMin and priceMax filters
//     const priceMin = this.filtersService.priceMinSource.getValue();
//     const priceMax = this.filtersService.priceMaxSource.getValue();
//     filteredItems = filteredItems.filter(
//       (item: any) =>
//         item.regularPrice >= priceMin && item.regularPrice <= priceMax
//     );

//     // Apply yearMin and yearMax filters
//     const yearMin = Number(this.filtersService.yearMinSource.getValue());
//     const yearMax = Number(this.filtersService.yearMaxSource.getValue());
//     filteredItems = filteredItems.filter(
//       (item: any) =>
//         Number(item.year) >= yearMin && Number(item.year) <= yearMax
//     );

//     // Apply ratings filter
//     const ratings = this.filtersService.ratingsSource.getValue();
//     if (ratings.length > 0) {
//       filteredItems = filteredItems.filter((item: any) =>
//         ratings.includes(Math.round(item.rating || 0))
//       );
//     }

//     // Update the totalItems$ BehaviorSubject
//     this.totalItems$.next(filteredItems.length);

//     return filteredItems;
//   }

//   updatePagination() {
//     const filteredItems = this.applyFilters();

//     // Paginate items
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     const paginatedItems = filteredItems.slice(startIndex, endIndex);

//     this.itemList$.next(paginatedItems);
//   }

//   onPageChange(event: PageEvent) {
//     this.currentPage = event.pageIndex + 1;
//     this.paginationService.updateCurrentPage(this.currentPage);
//     this.itemsPerPage = event.pageSize;
//     this.updatePagination();
//   }

//   getCurrentPageIndex(): number {
//     let pageIndex = 0;
//     this.paginationService.currentPage$.pipe(take(1)).subscribe(() => {
//       pageIndex = this.currentPage - 1;
//     });
//     return pageIndex;
//   }

//   getRatingStars(rating: number | undefined): number[] {
//     const fullStars = Math.round(rating || 0);
//     const emptyStars = 5 - fullStars;

//     return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
//   }

//   openItemDetails(item: IMeilisearchItem) {
//     this.router.navigate(['/items', item.id]);
//   }

//   addToFavorites(item: IMeilisearchItem, event: Event) {
//     console.log('Item added to favorites:', item);
//     event.stopPropagation();
//   }

//   addToCart(item: IMeilisearchItem, event: Event) {
//     console.log('Item added to cart:', item);
//     event.stopPropagation();
//   }
// }
