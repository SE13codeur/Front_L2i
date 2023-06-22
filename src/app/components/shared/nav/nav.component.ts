import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AccountUserDrawerService,
  AdminAuthService,
  CartDrawerService,
} from '@services/index';
import { Observable } from 'rxjs';
import { AuthState, Logout } from 'src/app/modules/auth/index';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdmin = false;

  constructor(
    private router: Router,
    private adminAuthService: AdminAuthService,
    private cartDrawerService: CartDrawerService,
    private accountUserDrawerService: AccountUserDrawerService
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
  }

  toggleCartDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  toggleAccountUserDrawer() {
    this.accountUserDrawerService.toggleDrawer();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
