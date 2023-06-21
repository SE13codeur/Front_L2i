import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.adminAuthService.isAdminAuthenticated$) {
      return true;
    }

    this.router.navigate(['/account/login']);
    return false;
  }
}
