import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '@env/environment.dev';
import { IMeilisearchItem } from '@m/IMeilisearchItem';

@Injectable({
  providedIn: 'root',
})
export class MeiliSearchService {
  private readonly meiliSearchUrl: string;
  private readonly headers: HttpHeaders;

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

  getSearchValue(): Observable<string> {
    return this.searchValue$.asObservable();
  }

  setSearchValue(value: string): void {
    this.searchValue$.next(value);
  }

  updatedSearch(
    query: string,
    filters: string = '',
    options: object = {}
  ): Observable<IMeilisearchItem[]> {
    let params = new HttpParams().set('q', query);
    if (filters) {
      params = params.set('filters', filters);
    }

    return this.http
      .get<{ hits: IMeilisearchItem[] }>(this.meiliSearchUrl, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        map((response) => response.hits),
        tap((results) => {
          // Update with new results
          this.searchResultsFromMeilisearch$.next(results);
        })
      );
  }

  getAllItems(): Observable<IMeilisearchItem[]> {
    return this.updatedSearch(''); // params for all books
  }

  getItemById(id: string): Observable<IMeilisearchItem> {
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
