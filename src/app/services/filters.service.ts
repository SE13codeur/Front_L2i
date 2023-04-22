import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  categoriesSource = new BehaviorSubject<number[]>([]);
  categories$ = this.categoriesSource.asObservable();

  priceMinSource = new BehaviorSubject<number>(0);
  priceMin$ = this.priceMinSource.asObservable();

  priceMaxSource = new BehaviorSubject<number>(500);
  priceMax$ = this.priceMaxSource.asObservable();

  yearMinSource = new BehaviorSubject<string>('2010');
  yearMin$ = this.yearMinSource.asObservable();

  yearMaxSource = new BehaviorSubject<string>(
    new Date().getFullYear().toString()
  );
  yearMax$ = this.yearMaxSource.asObservable();

  ratingsSource = new BehaviorSubject<number[]>([]);
  ratings$ = this.ratingsSource.asObservable();

  updateCategory(categories: number[]) {
    this.categoriesSource.next(categories);
  }

  updatePriceMin(priceMin: number) {
    this.priceMinSource.next(priceMin);
  }

  updatePriceMax(priceMax: number) {
    this.priceMaxSource.next(priceMax);
  }

  updateYearMin(yearMin: number) {
    this.yearMinSource.next(yearMin.toString());
  }

  updateYearMax(yearMax: number) {
    this.yearMaxSource.next(yearMax.toString());
  }

  updateRatings(ratings: number[]) {
    this.ratingsSource.next(ratings);
  }

  subscribeToAllFilters(
    callback: () => void,
    takeUntil$: Observable<void>
  ): void {
    this.categories$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.priceMin$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.priceMax$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.yearMin$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.yearMax$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());

    this.ratings$.pipe(takeUntil(takeUntil$)).subscribe(() => callback());
  }
}
