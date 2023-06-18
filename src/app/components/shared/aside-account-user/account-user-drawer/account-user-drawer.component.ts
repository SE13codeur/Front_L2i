import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '@models/user';
import { IUser } from '@models/user/IUser';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent implements OnInit {
  currentUser: IUser = {
    username: 'user',
    email: 'user@gmail.com',
    password: 'user',
    id: 1,
    role: 'customer',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openOrdersPage() {
    let username = this.currentUser.username; //this.authService.getUsername();

    this.router.navigate(['/items/orders', username]);
  }

  openProfilePage() {
    this.router.navigate(['/account/user/profile']);
  }

  openFavoritesPage() {
    this.router.navigate(['/account/user/favorites']);
  }
}
