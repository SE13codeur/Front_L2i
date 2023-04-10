import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@env/environments.dev';
import { IMeilisearchResult } from '@m/IMeilisearchItem';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MeiliSearchService {
  private readonly baseUrl: string;
  private searchResults = new BehaviorSubject<IMeilisearchResult[]>([]);

  constructor(private readonly http: HttpClient) {
    this.baseUrl = `${environment.meiliSearchApiUrl}/indexes/items/search`;
  }

  search(query: string): Observable<IMeilisearchResult[]> {
    return this.http
      .get<{ hits: IMeilisearchResult[] }>(this.baseUrl, {
        params: { q: query },
      })
      .pipe(map((response) => response.hits));
  }

  getSearchResults(): Observable<IMeilisearchResult[]> {
    return this.searchResults.asObservable();
  }
}
