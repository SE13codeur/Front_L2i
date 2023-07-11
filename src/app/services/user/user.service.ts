import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentPreProd } from '@env/environment.pre-prod';
import { IUser } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${environmentPreProd.apiUrl}/account/user/profile`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.userUrl}/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.userUrl}/${user.id}`, user);
  }
}
