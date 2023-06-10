import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev as environment } from '@env/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemsUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.itemsUrl}/login`, credentials);
  }
}
