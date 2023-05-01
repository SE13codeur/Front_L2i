import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  categoriesSource = new BehaviorSubject<string[]>([]);
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

  updateCategories(categories: string[]) {
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

  getFilterString(): string {
    let filterString = '';

    if (this.categoriesSource.getValue().length > 0) {
      const categories =
        `category IN ` +
        this.categoriesSource
          .getValue()
          .map((category) => `category = ${category}`)
          .join(',');
      filterString += `[${categories}]`;
    }

    const priceRange = `price : [${this.priceMinSource.getValue()} TO ${this.priceMaxSource.getValue()}]`;
    const yearRange = `year : [${this.yearMinSource.getValue()} TO ${this.yearMaxSource.getValue()}]`;

    if (this.ratingsSource.getValue().length > 0) {
      const ratings =
        `rating IN ` +
        this.ratingsSource
          .getValue()
          .map((rating) => `rating = ${rating}`)
          .join(',');
      filterString += filterString ? ` AND [${ratings}]` : `[${ratings}]`;
    }

    filterString += filterString ? ` AND ${priceRange}` : priceRange;
    filterString += filterString ? ` AND ${yearRange}` : yearRange;

    return filterString;
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
