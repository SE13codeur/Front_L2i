import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthor } from '@models/index';
import { environmentDev } from '@env/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthorService {
  private adminAuthorsUrl = `${environmentDev.apiUrl}/admin/authors`;

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(this.adminAuthorsUrl);
  }

  addItemAuthor(author: IAuthor): Observable<IAuthor> {
    const apiUrl = `${this.adminAuthorsUrl}`;
    return this.http.post<IAuthor>(apiUrl, author);
  }

  deleteItemAuthor(id: number): Observable<void> {
    const apiUrl = `${this.adminAuthorsUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editItemAuthor(id: number, author: IAuthor): Observable<IAuthor> {
    const apiUrl = `${this.adminAuthorsUrl}/${id}`;
    return this.http.put<IAuthor>(apiUrl, author);
  }
}
