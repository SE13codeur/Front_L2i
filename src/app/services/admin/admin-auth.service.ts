import { Injectable } from '@angular/core';
import { AuthState } from '@auth/index';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  @Select(AuthState.isAdmin) isAdminAuthenticated$:
    | Observable<boolean>
    | undefined;

  constructor() {}
}
