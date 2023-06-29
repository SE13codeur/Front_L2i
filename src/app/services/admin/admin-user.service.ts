import { IUser } from '@models/index';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
import { environmentDev } from '@env/environment.dev';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private adminUsersUrl = `${environmentDev.apiUrl}/admin/users`;

  constructor(
    private http: HttpClient,
    private adminAuthService: AdminAuthService
  ) {}

  addUser(user: IUser): Observable<IUser | null> {
    if (this.adminAuthService.isAdminAuthenticated$) {
      return this.adminAuthService.isAdminAuthenticated$.pipe(
        switchMap((isAdmin) => {
          if (isAdmin) {
            return this.http.post<IUser>(this.adminUsersUrl, user);
          } else {
            return of(null);
          }
        })
      );
    } else {
      return of(null);
    }
  }

  editUser(user: IUser): Observable<IUser | null> {
    if (this.adminAuthService.isAdminAuthenticated$) {
      return this.adminAuthService.isAdminAuthenticated$.pipe(
        switchMap((isAdmin) => {
          if (isAdmin) {
            return this.http.put<IUser>(
              `${this.adminUsersUrl}/${user.id}`,
              user
            );
          } else {
            return of(null);
          }
        })
      );
    } else {
      return of(null);
    }
  }

  deleteById(userId: string): Observable<void | null> {
    if (this.adminAuthService.isAdminAuthenticated$) {
      return this.adminAuthService.isAdminAuthenticated$.pipe(
        switchMap((isAdmin) => {
          if (isAdmin) {
            return this.http.delete<void>(`${this.adminUsersUrl}/${userId}`);
          } else {
            return of(null);
          }
        })
      );
    } else {
      return of(null);
    }
  }
}
