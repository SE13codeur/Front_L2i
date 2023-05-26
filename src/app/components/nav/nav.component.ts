import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@s/admin/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdmin = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminAuthenticated();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
