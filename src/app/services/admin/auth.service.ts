import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminAuthenticated = false;

  constructor() {}

  authenticateAdmin(): void {
    this.adminAuthenticated = true;
  }

  logoutAdmin(): void {
    this.adminAuthenticated = false;
  }

  isAdminAuthenticated(): boolean {
    return this.adminAuthenticated;
  }
}