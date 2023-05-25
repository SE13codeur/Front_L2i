import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IMeilisearchItem from '@m/IItem';
import { AdminItemService } from '@s/admin/admin-item.service';
import { AuthService } from '@s/admin/auth.service';
import { ItemService } from '@s/search/item.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  item$: Observable<IMeilisearchItem | null>;
  item: IMeilisearchItem | null = null;
  showReviews = false;
  isAdmin = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private authService: AuthService,
    private itemAdminService: AdminItemService
  ) {
    this.item$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) =>
        this.itemService.getItemById(id).pipe(catchError(() => of(null)))
      )
    );
  }

  ngOnInit(): void {
    this.item$.subscribe((item) => {
      this.item = item;
    });

    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  goBackToListItems(): void {
    this.router.navigate(['/items/books']);
  }

  getAuthorNames(): string {
    return this.item && this.item.authors
      ? this.item.authors
          .map((author) => `${author.firstname} ${author.lastname}`)
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

  goToEditItem(): void {
    if (this.item) {
      this.router.navigate([`/admin/items/books/${this.item.id}`]);
    }
  }
}
