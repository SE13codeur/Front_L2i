import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '@/models/ICategoryItem';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:909/ws/dev/api/books';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl);
  }

  getItemByISBN13(ISBN13: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.apiUrl}/${ISBN13}`);
  }
}
