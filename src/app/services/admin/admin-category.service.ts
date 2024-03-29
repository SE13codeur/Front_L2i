import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryItem } from '@models/index';
import { environmentPreProd } from '@env/environment.pre-prod';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
  private adminCategoriesUrl = `${environmentPreProd.apiUrl}/admin/categories`;

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
