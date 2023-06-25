import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Logout } from '@auth/store/auth.action';
import { AuthState } from '@auth/store/auth.state';
import { environmentDev as environment } from '@env/environment.dev';
import { IUser, ICustomer } from '@models/index';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private itemsUrl = `${environment.apiUrl}/auth`;
  private userStore = new BehaviorSubject<IUser | ICustomer | null>(null);
  public readonly user$ = this.userStore.asObservable();

  constructor(private http: HttpClient, private store: Store) {}

  login(credentials: {
    username: string;
    role: string;
    email: string;
  }): Observable<boolean> {
    return this.http
      .post<IUser | ICustomer>(`${this.itemsUrl}/login`, credentials, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 200) {
            this.userStore.next(response.body);
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.handleError)
      );
  }

  register(user: IUser | ICustomer) {
    return this.http
      .post(`${this.itemsUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  dispatchLoginAction(credentials: {
    username: string;
    role: string;
    email: string;
  }): Observable<any> {
    return this.store
      .dispatch(new Login(credentials))
      .pipe(catchError(this.handleError));
  }

  dispatchLogoutAction(): Observable<any> {
    return this.store.dispatch(new Logout()).pipe(catchError(this.handleError));
  }

  getUsername(): Observable<string | null> {
    return this.store.select(AuthState.getUsername);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 401) {
      errorMessage =
        'Le pseudo ou mot de passe est incorrect. Veuillez réessayer.';
    } else if (error.status === 400) {
      errorMessage =
        'Les informations que vous avez fournies sont incorrectes. Veuillez vérifier et réessayer.';
    } else if (error.status === 500) {
      errorMessage =
        'Il y a un problème avec le serveur. Veuillez réessayer plus tard.';
    } else {
      errorMessage =
        'Le pseudo ou mot de passe est incorrect. Veuillez réessayer.';
    }

    return throwError(errorMessage);
  }
}
