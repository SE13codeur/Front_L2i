import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environmentDev as environment } from '@env/environment.dev';

import { IMeilisearchItem } from '@m/IMeilisearchItem';

@Injectable({
  providedIn: 'root',
})
export class MeiliSearchService {
  private readonly meiliSearchUrl: string;
  private readonly headers: HttpHeaders;

  private items$ = new BehaviorSubject<IMeilisearchItem[]>([]);
  private searchResultsFromMeilisearch$ = new BehaviorSubject<
    IMeilisearchItem[]
  >([]);
  searchResults$ = this.searchResultsFromMeilisearch$.asObservable();
  private searchValue$ = new BehaviorSubject<string>('');

  constructor(private readonly http: HttpClient) {
    this.meiliSearchUrl = `${environment.meiliSearchApiUrl}/indexes/items/search`;
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${environment.meiliSearchApiKey}`,
    });
  }

  getAllItems(): Observable<IMeilisearchItem[]> {
    return this.updatedSearch('', '', { limit: 112, itemsPerPage: 12 }).pipe(
      map((response) => response.hits)
    );
  }

  getItemsByPage(
    page: number,
    itemsPerPage: number,
    filters: string = ''
  ): Observable<IMeilisearchItem[]> {
    return this.updatedSearch('', filters, { page, itemsPerPage }).pipe(
      map((response) => response.hits)
    );
  }

  getItemById(id: string): Observable<IMeilisearchItem> {
    const item = this.items$.getValue().find((item) => item.id === id);

    if (item) {
      return of(item);
    } else {
      const params = new HttpParams().set('q', id);
      return this.http
        .get<{ hits: IMeilisearchItem[] }>(this.meiliSearchUrl, {
          params: params,
          headers: this.headers,
        })
        .pipe(
          map((response) => {
            if (response.hits.length > 0) {
              return response.hits[0];
            } else {
              throw new Error(`Book not found with id: ${id}`);
            }
          })
        );
    }
  }

  updatedSearch(
    query: string,
    filters: string = '',
    options: {
      page?: number;
      itemsPerPage?: number;
      limit?: number;
    } = {}
  ): Observable<{ hits: IMeilisearchItem[]; totalItems: number }> {
    let params = query ? new HttpParams().set('q', query) : new HttpParams();

    const itemsPerPage = options.itemsPerPage ?? 12;
    if (filters) {
      params = params.set('filter', filters);
    }
    if (options.page !== undefined) {
      params = params.set('offset', String(options.page * itemsPerPage));
    }
    if (itemsPerPage !== undefined) {
      params = params.set('limit', String(itemsPerPage));
    }
    if (!query) {
      params = params.set('limit', String(options.limit ?? 112));
    }

    return this.http
      .get<{ hits: IMeilisearchItem[]; nbHits: number }>(this.meiliSearchUrl, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        map((response) => ({
          hits: response.hits,
          totalItems: response.nbHits,
        })),
        tap(({ hits }) => {
          // Update with new results
          this.items$.next(hits);
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
