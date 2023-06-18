import { Component, OnInit } from '@angular/core';
import { IUser } from '@models/index';
import { UserService } from '@services/user';

@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css'],
})
export class ProfileUserPageComponent implements OnInit {
  user: IUser | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = 1;
    this.userService
      .getUserById(userId)
      .subscribe((user) => (this.user = user));
  }

  onSubmit(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe((updatedUser) => {
        console.log('User updated successfully:', updatedUser);
      });
    }
  }
}
