import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '@auth-s/index';
import { Router } from '@angular/router';
import { IUser } from '@models/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: IUser | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    console.log('login clicked');
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.dispatchLoginAction(credentials).subscribe({
        next: (user) => {
          this.user = user;
          this.router.navigate(['/items/books']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion:', error);
        },
      });
    }
  }

  // go back to the last page
  goBack(): void {
    this.location.back();
  }
}
