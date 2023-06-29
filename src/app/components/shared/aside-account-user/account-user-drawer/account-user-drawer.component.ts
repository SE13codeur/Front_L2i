import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CheckAuthService } from '@auth-s/index';
import { IUser } from '@models/index';
import { AccountUserDrawerService, AdminAuthService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent implements OnInit {
  user: IUser | null = null;
  username$: Observable<string | null> | undefined;
  isAuthenticated$: Observable<boolean> | undefined;
  isAdmin = false;

  constructor(
    private router: Router,
    private accountUserDrawerService: AccountUserDrawerService,
    private authService: AuthService,
    private checkAuthService: CheckAuthService,
    private adminAuthService: AdminAuthService
  ) {
    this.username$ = this.authService.getUsername();
    this.isAuthenticated$ = this.checkAuthService.isAuthenticated$;
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
  }

  openOrdersPage() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/items/orders', user.id]);
      }
      if (this.isAdmin) {
        this.router.navigate(['admin/orders']);
      }
      if (!user) {
        this.router.navigate(['items/books']);
      }
      this.accountUserDrawerService.closeDrawer();
    });
  }

  openAdminOrdersPage() {
    this.authService.user$.subscribe((user) => {
      if (user && this.isAdmin) {
        this.router.navigate(['admin/orders']);
      }
      if (!user) {
        this.router.navigate(['items/books']);
      }
      this.accountUserDrawerService.closeDrawer();
    });
  }

  openProfilePage() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['items/books']);
      }
      if (user) {
        this.router.navigate(['/account/user/profile']);
      }
      this.accountUserDrawerService.closeDrawer();
    });
  }

  openFavoritesPage() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.router.navigate(['items/books']);
      }
      this.router.navigate(['/account/user/favorites']);
    });
    this.accountUserDrawerService.closeDrawer();
  }

  openUsersPage() {
    this.authService.user$.subscribe((user) => {
      if (user && this.isAdmin) {
        this.router.navigate(['/admin/user/list']);
      }
      if (!user) {
        this.router.navigate(['items/books']);
      }
      this.accountUserDrawerService.closeDrawer();
    });
  }

  onLogout() {
    this.authService.dispatchLogoutAction().subscribe({
      next: () => {
        this.accountUserDrawerService.closeDrawer();
        this.router.navigate(['/items/books']);
        this.isAdmin = false;
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      },
    });
  }
}
