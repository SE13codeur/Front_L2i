import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckAuthService } from 'src/app/modules/auth/index';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private checkAuthService: CheckAuthService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.checkAuthService.checkAuthenticationAndRedirect()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
