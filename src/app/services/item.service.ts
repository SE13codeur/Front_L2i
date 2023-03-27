import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Item from '../models/IBook';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private urlItem: string = 'https://api.itbook.store/1.0/new';

  constructor(private http: HttpClient) {}

  getItemList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.urlItem);
  }

  // getItemById(itemId: Item): Observable<Item | undefined> {
  //   return this.http.get<Item[]>(this.urlItem);
  // }
}
