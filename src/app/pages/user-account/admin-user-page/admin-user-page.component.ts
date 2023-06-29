import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css'],
})
export class AdminUserPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToAdminUserForm() {
    this.router.navigate(['/admin/users']);
  }
}
