import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDev } from '@env/environment.dev';
import { ICustomer, IUser } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${environmentDev.apiUrl}/account/user/profile`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.userUrl}/${id}`);
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.userUrl}/${user.id}`, user);
  }

  addUser(userData: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.userUrl, userData);
  }

  editUser(userId: number, userData: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(`${this.userUrl}/${userId}`, userData);
  }
}
