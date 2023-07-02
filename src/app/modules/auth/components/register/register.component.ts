import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth-s/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get firstname(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
          let successMessage = `Confirmation, votre inscription est réussie !`;
          this.snackBar.open(successMessage, 'Fermer', { duration: 5005 });
        },
        error: (error) => {
          let errorMessage =
            'Le pseudo ou mot de passe est déjà utilisé. Veuillez réessayer.';
          if (error.status === 400) {
            errorMessage =
              'Les informations que vous avez fournies sont incorrectes. Veuillez vérifier et réessayer.';
          }
          if (error.status === 409) {
            errorMessage =
              'Un utilisateur avec ce pseudo ou cette adresse e-mail existe déjà.';
          }
          if (error.status === 401) {
            errorMessage =
              'Le pseudo ou mot de passe est incorrect. Veuillez réessayer.';
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
