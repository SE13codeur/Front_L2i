import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/modules/auth/index';
import { Observable } from 'rxjs';
import { AuthService } from '@services/admin';

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
    return true;
  }
}
