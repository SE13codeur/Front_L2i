import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  categoriesSource = new BehaviorSubject<string[]>([]);
  categories$ = this.categoriesSource.asObservable();

  authorsSource = new BehaviorSubject<string[]>([]);
  authors$ = this.authorsSource.asObservable();

  priceMinSource = new BehaviorSubject<number>(0);
  priceMin$ = this.priceMinSource.asObservable();

  priceMaxSource = new BehaviorSubject<number>(500);
  priceMax$ = this.priceMaxSource.asObservable();

  ratingsSource = new BehaviorSubject<number[]>([]);
  ratings$ = this.ratingsSource.asObservable();

  updateCategory(categories: string[]) {
    this.categoriesSource.next(categories);
  }

  updateAuthor(authors: string[]) {
    this.authorsSource.next(authors);
  }

  updatePriceMin(priceMin: number) {
    this.priceMinSource.next(priceMin);
  }

  updatePriceMax(priceMax: number) {
    this.priceMaxSource.next(priceMax);
  }

  updateRating(ratings: number[]) {
    this.ratingsSource.next(ratings);
  }

  subscribeToAllFilters(
    callback: () => void,
    takeUntil$: Observable<void>
  ): void {
    this.categories$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.authors$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.priceMin$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.priceMax$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.ratings$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());
  }
}
