import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CheckAuthService } from '@auth-s/index';
import { AccountUserDrawerService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent implements OnInit {
  username$: Observable<string | null> | undefined;

  constructor(
    private router: Router,
    private accountUserDrawerService: AccountUserDrawerService,
    private checkAuthService: CheckAuthService,
    private authService: AuthService
  ) {
    this.username$ = this.authService.getUsername();
  }

  ngOnInit(): void {}

  openOrdersPage() {
    let username = this.username$;

    this.router.navigate(['/items/orders', username]);
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
