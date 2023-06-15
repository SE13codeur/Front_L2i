import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CartDrawerService } from '@services/index';
import { AccountCustomerDrawerService } from '@services/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdmin = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartDrawerService: CartDrawerService,
    private accountCustomerDrawerService: AccountCustomerDrawerService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  toggleDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  openAccountCustomerDrawer() {
    this.accountCustomerDrawerService.openDrawer();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
