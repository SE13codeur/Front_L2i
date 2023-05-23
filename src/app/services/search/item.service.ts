import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IItem from '@m/IItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private itemsUrl = 'http://localhost:8080/items'; // URL to Spring Boot

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.itemsUrl);
  }
}
