import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../models/IBook';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private urlBookList: string = 'https://api.itbook.store/1.0/new';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.urlBookList);
  }
}
