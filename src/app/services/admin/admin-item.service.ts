import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '@env/environment.dev';
import IMeilisearchItem from '@m/IItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminItemService {
  private baseApiUrl = `${environmentDev.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  addItem(
    itemType: string,
    item: IMeilisearchItem
  ): Observable<IMeilisearchItem> {
    const apiUrl = `${this.baseApiUrl}/${itemType}`;
    return this.http.post<IMeilisearchItem>(apiUrl, item);
  }

  deleteItem(itemType: string, id: string): Observable<void> {
    const apiUrl = `${this.baseApiUrl}/${itemType}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}
