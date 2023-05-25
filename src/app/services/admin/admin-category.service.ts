import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryItem } from '@m/IItem';
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

  deleteItemCategory(id: string): Observable<void> {
    const apiUrl = `${this.adminCategoriesUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editItemCategory(
    id: string,
    category: ICategoryItem
  ): Observable<ICategoryItem> {
    const apiUrl = `${this.adminCategoriesUrl}/${id}`;
    return this.http.put<ICategoryItem>(apiUrl, category);
  }
}
