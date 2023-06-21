import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IItem } from '@models/index';
import {
  AdminAuthService,
  ItemService,
  PaginationService,
} from '@services/index';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';

@Component({
  selector: 'app-promos-page',
  templateUrl: './promos-page.component.html',
  styleUrls: ['./promos-page.component.css'],
})
export class PromosPageComponent implements OnInit {
  @Input() items: IItem[] = [];
  isInCart: ((id: number) => Observable<boolean>) | undefined;
  isAdmin = false;

  currentSearch: string = '';
  itemsOnSale$ = new BehaviorSubject<IItem[]>([]);
  totalItems$ = new BehaviorSubject<number | null>(null);
  itemsPerPage = 12;
  currentPage = 1;
  isFavorite: { [id: number]: boolean } = {};

  private readonly destroy$ = new Subject<void>();

  constructor(
    private itemService: ItemService,
    private paginationService: PaginationService,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
    this.itemService.getItems().subscribe((items) => {
      const itemsOnSale = items.filter((item) => item.onSale == 1);
      this.itemsOnSale$.next(itemsOnSale);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.paginationService.updateCurrentPage(this.currentPage);
    this.itemsPerPage = event.pageSize;
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

  addToFavorites(itemId: number, event: Event) {
    this.isFavorite[itemId] = !this.isFavorite[itemId];
    event.stopPropagation();
    console.log('Item added to favorites:', itemId);
  }
}
