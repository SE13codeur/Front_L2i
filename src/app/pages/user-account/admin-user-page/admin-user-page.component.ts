import { AdminUserService } from '@services/index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@models/user';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@auth-s/auth.service';

@Component({
  selector: 'app-admin-user-page',
  templateUrl: './admin-user-page.component.html',
  styleUrls: ['./admin-user-page.component.css'],
})
export class AdminUserPageComponent implements OnInit {
  users$ = new BehaviorSubject<IUser[]>([]);
  user: IUser | null = null;
  isAdmin = false;

  constructor(
    private router: Router,
    private adminUserService: AdminUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (this.user && !this.isAdmin) {
        this.getAllUsers();
      }
    });
  }

  getAllUsers(): void {
    this.adminUserService.getAllUsers().subscribe({
      next: (users) => {
        this.users$.next(users);
      },
      error: (error) => {
        console.error('Error while fetching users:', error);
      },
    });
  }

  goToAdminUserForm() {
    this.router.navigate(['/admin/users']);
  }
}
