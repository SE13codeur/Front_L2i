import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/ICategoryItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private urlBook: string = 'http://localhost:909/ws/dev';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.urlBook);
  }

  getItemByISBN13(ISBN13: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.urlBook}/${ISBN13}`);
  }
}
