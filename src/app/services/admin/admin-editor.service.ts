import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEditor } from '@m/IItem';
import { environmentDev } from '@env/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AdminEditorService {
  private adminEditorsUrl = `${environmentDev.apiUrl}/admin/editors`;

  constructor(private http: HttpClient) {}

  getEditors(): Observable<IEditor[]> {
    return this.http.get<IEditor[]>(this.adminEditorsUrl);
  }

  addItemEditor(editor: IEditor): Observable<IEditor> {
    const apiUrl = `${this.adminEditorsUrl}`;
    return this.http.post<IEditor>(apiUrl, editor);
  }

  deleteItemEditor(id: string): Observable<void> {
    const apiUrl = `${this.adminEditorsUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }

  editItemEditor(id: string, editor: IEditor): Observable<IEditor> {
    const apiUrl = `${this.adminEditorsUrl}/${id}`;
    return this.http.put<IEditor>(apiUrl, editor);
  }
}
