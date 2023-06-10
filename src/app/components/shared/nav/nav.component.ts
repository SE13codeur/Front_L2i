import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, Logout } from 'src/app/modules/auth/index';
import { Store } from '@ngxs/store';
import { AuthService, CartDrawerService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdmin = false;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartDrawerService: CartDrawerService,
    private store: Store
  ) {
    this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  toggleDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
