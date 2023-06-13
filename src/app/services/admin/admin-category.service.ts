import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryItem } from '@models/index';
import { environmentDev } from '@env/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
  private adminCategoriesUrl = `${environmentDev.apiUrl}/admin/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategoryItem[]> {
    return this.http.get<ICategoryItem[]>(this.adminCategoriesUrl);
  }

  addItemCategory(category: ICategoryItem): Observable<ICategoryItem> {
    const apiUrl = `${this.adminCategoriesUrl}`;
    return this.http.post<ICategoryItem>(apiUrl, category);
  }

  deleteItemCategory(id: number): Observable<void> {
    const apiUrl = `${this.adminCategoriesUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editItemCategory(
    id: number,
    category: ICategoryItem
  ): Observable<ICategoryItem> {
    const apiUrl = `${this.adminCategoriesUrl}/${id}`;
    return this.http.put<ICategoryItem>(apiUrl, category);
  }
}
