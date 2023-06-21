import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CheckAuthService } from '@auth-s/index';
import { IUser } from '@models/index';
import { AccountUserDrawerService } from '@services/index';
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

  constructor(
    private router: Router,
    private accountUserDrawerService: AccountUserDrawerService,
    private authService: AuthService,
    private checkAuthService: CheckAuthService
  ) {
    this.username$ = this.authService.getUsername();
    this.isAuthenticated$ = this.checkAuthService.isAuthenticated$;
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  openOrdersPage() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/items/orders', user.id]);
      } else {
        console.error(`${user} non disponible`);
      }
      this.accountUserDrawerService.closeDrawer();
    });
  }

  openProfilePage() {
    this.router.navigate(['/account/user/profile']);
  }

  openFavoritesPage() {
    this.router.navigate(['/account/user/favorites']);
  }

  onLogout() {
    this.authService.dispatchLogoutAction().subscribe({
      next: () => {
        this.accountUserDrawerService.closeDrawer();
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      },
    });
  }
}
