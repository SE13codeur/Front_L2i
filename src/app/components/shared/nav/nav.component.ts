import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CartDrawerService } from '@services/index';

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
    private cartDrawerService: CartDrawerService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  toggleDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
