import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IItem from '@m/IItem';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = 'http://localhost:909/ws/dev/items/books';
  private items$ = new BehaviorSubject<IItem[]>([]);
  private searchValue$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    this.http
      .get<IItem[]>(`${this.itemsUrl}`)
      .subscribe((items) => this.items$.next(items));
    return this.items$.asObservable();
  }

  getItemsByPage(
    page: number,
    itemsPerPage: number,
    filters: string = ''
  ): Observable<IItem[]> {
    return this.updatedSearch('', page, itemsPerPage, filters).pipe(
      map((response) => response.hits)
    );
  }

  updatedSearch(
    query: string = '',
    page: number = 1,
    itemsPerPage: number = 12,
    filters: string = ''
  ): Observable<{ hits: IItem[]; totalItems: number }> {
    let params = new HttpParams()
      .set('query', query)
      .set('page', String(page))
      .set('itemsPerPage', String(itemsPerPage));

    if (filters) {
      params = params.set('filters', filters);
    }

    return this.http
      .get<{ hits: IItem[]; totalItems: number }>(this.itemsUrl, {
        params: params,
      })
      .pipe(
        map((response) => ({
          hits: response.hits,
          totalItems: response.totalItems,
        })),
        tap(({ hits }) => {
          // Update with new results
          this.items$.next(hits);
        })
      );
  }

  getItemById(id: string): Observable<IItem> {
    const url = `${this.itemsUrl}/${id}`;
    this.http.get<IItem>(url).subscribe((item) => {
      const currentItems = this.items$.getValue();
      const updatedItems = currentItems.map((currentItem) =>
        currentItem.id === item.id ? item : currentItem
      );
      this.items$.next(updatedItems);
    });
    return this.items$.asObservable().pipe(
      map((items) => {
        const foundItem = items.find((item) => item.id === id);
        if (foundItem) {
          return foundItem;
        } else {
          throw new Error(`Item with id ${id} not found`);
        }
      })
    );
  }

  getSearchValue(): Observable<string> {
    return this.searchValue$.asObservable();
  }

  setSearchValue(value: string): void {
    this.searchValue$.next(value);
  }
}
