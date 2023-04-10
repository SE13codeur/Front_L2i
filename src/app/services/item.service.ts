import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '@/models/IMeilisearchItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:909/ws/dev/api/books';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItemByISBN13(ISBN13: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${ISBN13}`);
  }
}
