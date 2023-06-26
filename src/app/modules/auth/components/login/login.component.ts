import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '@auth-s/index';
import { Router } from '@angular/router';
import { IUser } from '@models/index';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.dispatchLoginAction(credentials).subscribe({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/items/books']);
            let successMessage = `Heureux de vous revoir ${this.user?.username}, connexion réussie !`;
            this.snackBar.open(successMessage, 'Fermer', { duration: 5005 });
          }
        },
        error: (error) => {
          let errorMessage =
            'Le pseudo ou mot de passe est incorrect. Veuillez réessayer.';
          if (error.status === 400) {
            errorMessage =
              'Les informations que vous avez fournies sont incorrectes. Veuillez vérifier et réessayer.';
          }
          if (error.status === 401) {
            errorMessage =
              'Le pseudo ou mot de passe est incorrect. Veuillez réessayer.';
          }
          if (error.status === 409) {
            errorMessage =
              'Un utilisateur avec ce pseudo ou cette adresse e-mail existe déjà.';
          }
          if (error.status === 500) {
            errorMessage =
              'Il y a un problème avec le serveur. Veuillez réessayer plus tard.';
          }
          this.snackBar.open(errorMessage, 'Fermer', { duration: 5005 });
        },
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
