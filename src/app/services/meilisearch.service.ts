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
    options: { page?: number; itemsPerPage?: number } = {}
  ): Observable<{ hits: IMeilisearchItem[]; totalItems: number }> {
    let params = new HttpParams().set('q', query);
    if (filters) {
      params = params.set('filters', filters);
    }

    const itemsPerPage = options.itemsPerPage ?? 12;

    if (options.page !== undefined) {
      params = params.set('offset', String(options.page * itemsPerPage));
    }
    if (options.itemsPerPage !== undefined) {
      params = params.set('limit', String(itemsPerPage));
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
          this.searchResultsFromMeilisearch$.next(hits);
        })
      );
  }

  getItemsByPage(
    page: number,
    itemsPerPage: number
  ): Observable<IMeilisearchItem[]> {
    const offset = page * itemsPerPage;
    const limit = itemsPerPage;

    const searchParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get<IMeilisearchItem[]>(this.meiliSearchUrl, {
      params: searchParams,
    });
  }

  getAllItems(): Observable<IMeilisearchItem[]> {
    return this.updatedSearch('').pipe(
      map((response) => response.hits) // Récupérez uniquement les hits pour correspondre au type d'Observable<IMeilisearchItem[]>
    );
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
