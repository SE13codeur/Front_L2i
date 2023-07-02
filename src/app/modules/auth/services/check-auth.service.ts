import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '@auth/store/auth.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthService {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  }

  checkAuthenticationAndRedirect(returnUrl?: string): boolean {
    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: returnUrl || this.router.routerState.snapshot.url,
        },
      });
      return false;
    }
    if (isAuthenticated) {
      this.authService.getUsername();
    }
    return true;
  }
}
