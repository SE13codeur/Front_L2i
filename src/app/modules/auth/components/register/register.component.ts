import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth-s/index';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  get phoneNumber(): FormControl {
    return this.registerForm.get('phoneNumber') as FormControl;
  }

  get billingStreet(): FormControl {
    return this.registerForm.get('billingAddress.street') as FormControl;
  }

  get billingCity(): FormControl {
    return this.registerForm.get('billingAddress.city') as FormControl;
  }

  get billingPostalCode(): FormControl {
    return this.registerForm.get('billingAddress.postalCode') as FormControl;
  }

  get billingCountry(): FormControl {
    return this.registerForm.get('billingAddress.country') as FormControl;
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
      phoneNumber: [''],
      billingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        state: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        postalCode: [''],
        country: [''],
        state: [''],
      }),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // let user = this.registerForm.value;
      // Combine les adresses de facturation et d'expédition en un tableau
      // user.addresses = [];
      // if (user.billingAddress) {
      //   user.addresses.push(user.billingAddress);
      //   delete user.billingAddress;
      // }
      // if (user.shippingAddress) {
      //   user.addresses.push(user.shippingAddress);
      //   delete user.shippingAddress;
      // }
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
          let successMessage = `Félicitation, votre inscription est réussie !`;
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
