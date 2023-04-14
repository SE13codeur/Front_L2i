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

  private searchResultsFromMeilisearch = new BehaviorSubject<
    IMeilisearchItem[]
  >([]);
  searchResults$ = this.searchResultsFromMeilisearch.asObservable();

  constructor(private readonly http: HttpClient) {
    this.meiliSearchUrl = `${environment.meiliSearchApiUrl}/indexes/items/search`;
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${environment.meiliSearchApiKey}`,
    });
  }

  search(
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
          this.searchResultsFromMeilisearch.next(results);
        })
      );
  }

  getAllBooks(): Observable<IMeilisearchItem[]> {
    return this.search(''); // params for all books
  }
}
