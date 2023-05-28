import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '@env/environment.dev';
import { IItem } from '@models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminItemService {
  private adminItemsUrl = `${environmentDev.apiUrl}/admin/items/books`;

  constructor(private http: HttpClient) {}

  addItem(item: IItem): Observable<IItem> {
    const apiUrl = `${this.adminItemsUrl}`;
    return this.http.post<IItem>(apiUrl, item);
  }

  deleteItem(id: number): Observable<void> {
    const apiUrl = `${this.adminItemsUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editItem(id: number, item: IItem): Observable<IItem> {
    const apiUrl = `${this.adminItemsUrl}/${id}`;
    return this.http.put<IItem>(apiUrl, item);
  }
}
