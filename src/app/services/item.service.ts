import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Item from '../models/IBook';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private urlItem: string = 'https://openlibrary.org/api/books';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.urlItem);
  }

  getItemById(itemId: string): Observable<Item> {
    return this.http.get<Item>(`${this.urlItem}/${itemId}.json`);
  }
}
