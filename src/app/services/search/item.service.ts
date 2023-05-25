import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '@env/environment.dev';
import IItem from '@m/IItem';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = `${environmentDev.apiUrl}/items/books`;
  private items$ = new BehaviorSubject<IItem[]>([]);
  private searchValue$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.itemsUrl).pipe(
      map((items) => (items ? items : [])),
      catchError((error) => {
        console.error('Erreur lors de la récupération des items', error);
        return of([]);
      })
    );
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
    return this.http.get<IItem>(url).pipe(
      catchError((error) => {
        console.error(`Error getting item with id ${id}`, error);
        throw new Error(`Error getting item with id ${id}`);
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
