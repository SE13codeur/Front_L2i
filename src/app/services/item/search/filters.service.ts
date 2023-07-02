import { Injectable } from '@angular/core';
import { IItem } from '@models/index';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  filtersUpdated$ = new Subject<void>();

  updateFilterValue<T>(subject: BehaviorSubject<T>, newValue: T): void {
    subject.next(newValue);
    this.filtersUpdated$.next();
  }

  updateCategories(categories: string[]): void {
    this.updateFilterValue(this.categoriesSource, categories);
  }

  updatePriceMin(priceMin: number): void {
    this.updateFilterValue(this.priceMinSource, priceMin);
  }

  updatePriceMax(priceMax: number): void {
    this.updateFilterValue(this.priceMaxSource, priceMax);
  }

  updateYearMin(yearMin: number): void {
    this.updateFilterValue(this.yearMinSource, yearMin.toString());
  }

  updateYearMax(yearMax: number): void {
    this.updateFilterValue(this.yearMaxSource, yearMax.toString());
  }

  updateRatings(ratings: number[]): void {
    this.updateFilterValue(this.ratingsSource, ratings);
  }

  getFilterString(): string {
    let filterString = '';

    if (this.categoriesSource.getValue().length > 0) {
      const categories = this.categoriesSource
        .getValue()
        .map((category) => `category = ${category}`)
        .join(' OR ');
      filterString += `(${categories})`;
    }

    const priceRange = `price >= ${this.priceMinSource.getValue()} AND price <= ${this.priceMaxSource.getValue()}`;
    const yearRange = `year >= ${this.yearMinSource.getValue()} AND year <= ${this.yearMaxSource.getValue()}`;

    if (this.ratingsSource.getValue().length > 0) {
      const ratings = this.ratingsSource
        .getValue()
        .map((rating) => `rating = ${rating}`)
        .join(' OR ');
      filterString += filterString ? ` AND (${ratings})` : `(${ratings})`;
    }

    filterString += filterString ? ` AND ${priceRange}` : priceRange;
    filterString += filterString ? ` AND ${yearRange}` : yearRange;

    return filterString;
  }

  filterItems(items: IItem[], filterString: string): IItem[] {
    const filteredItems = items.filter((item) => {
      const itemString = JSON.stringify(item);

      return itemString.match(filterString);
    });

    return filteredItems;
  }

  subscribeToAllFilters(
    callback: () => void,
    takeUntil$: Observable<void>
  ): void {
    this.filtersUpdated$.pipe(takeUntil(takeUntil$)).subscribe(() => {
      callback();
    });
  }
}
