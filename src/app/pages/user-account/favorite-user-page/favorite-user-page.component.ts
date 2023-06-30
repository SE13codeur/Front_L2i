import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IItem } from '@models/index';
import { ItemService, UserStoreService } from '@services/index';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-user-page',
  templateUrl: './favorite-user-page.component.html',
  styleUrls: ['./favorite-user-page.component.css'],
})
export class FavoritesUserPageComponent implements OnInit {
  isAdmin = false;
  favoriteItems$ = new BehaviorSubject<IItem[]>([]);

  constructor(
    private userStoreService: UserStoreService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStoreService
      .getFavoriteItems()
      .pipe(
        switchMap((itemIds: number[]) => {
          // Filter out null values
          const validItemIds = itemIds.filter((id) => id !== null);

          // Convert the array of IDs into an array of Observables that get item details
          const itemObservables = validItemIds.map((itemId) =>
            this.itemService.getItemById(itemId)
          );

          // Combine all the Observables into one that emits an array of item details
          return combineLatest(itemObservables);
        })
      )
      .subscribe((items: IItem[]) => {
        // Now items is an array of IItem, which can be passed to favoriteItems$
        this.favoriteItems$.next(items);
      });
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  openItemDetails(item: IItem) {
    this.router.navigate(['/items/books', item.id]);
  }
}
