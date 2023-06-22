import { Injectable } from '@angular/core';
import { AuthState } from '@auth/index';
import { IUser } from '@models/index';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  @Select(AuthState.isAdmin) isAdminAuthenticated$:
    | Observable<boolean>
    | undefined;

  constructor() {}
}
