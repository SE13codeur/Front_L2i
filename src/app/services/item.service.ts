import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/ICategoryItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private urlItem: string = 'https://api.itbook.store/1.0/new';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.urlItem);
  }

  getItemByISBN13(ISBN13: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.urlItem}/${ISBN13}`);
  }
}
