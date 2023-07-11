import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem, IAuthor } from '@models/index';
import {
  AdminItemService,
  AdminAuthService,
  ItemService,
} from '@services/index';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NavigationHistoryService } from '@libs/navigation-history.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  item$: Observable<IItem | null>;
  item: IItem | null = null;
  showReviews = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private adminAuthService: AdminAuthService,
    private itemAdminService: AdminItemService,
    private navigationHistoryService: NavigationHistoryService,
    private location: Location
  ) {
    this.item$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) =>
        this.itemService.getItemById(id).pipe(catchError(() => of(null)))
      )
    );
  }

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
    this.item$.subscribe((item) => {
      this.item = item;
    });
  }

  getAuthorNames(): string {
    return this.item && this.item.authors
      ? this.item.authors
          .map((author: IAuthor) => `${author.firstname} ${author.lastname}`)
          .join(', ')
      : '';
  }

  toggleShowReviews(): void {
    this.showReviews = !this.showReviews;
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  setRating(newRating: number): void {
    if (this.item) {
      this.item.rating = newRating;
    }
    // TODO : mettre à jour la base de données
    console.log('New rating:', newRating);
  }

  deleteItem(): void {
    if (this.item) {
      this.itemAdminService.deleteItem(this.item.id).subscribe({
        next: (response: any) => {
          console.log('Item deleted successfully:', response);
          this.goBackToListItems();
        },
        error: (error: any) => {
          console.error('Error deleting item:', error);
        },
      });
    }
  }

  goBackToListItems(): void {
    this.router.navigate(['/items/books']);
  }

  goToEditItem(): void {
    if (this.item) {
      this.router.navigate([`/admin/items/books/${this.item.id}`]);
    }
  }

  goBackToPreviousPage(): void {
    const lastUrl = this.navigationHistoryService.getPreviousUrl();
    if (lastUrl.includes('/auth/login')) {
      this.router.navigate(['/items/books']);
    } else {
      this.location.back();
    }
  }
}
