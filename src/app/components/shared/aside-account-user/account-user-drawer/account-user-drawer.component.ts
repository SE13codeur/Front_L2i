import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth-s/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent implements OnInit {
  username$: Observable<string | null> | undefined;

  constructor(private router: Router, private authService: AuthService) {
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
}
