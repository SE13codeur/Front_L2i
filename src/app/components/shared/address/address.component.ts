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
import { IAddress, IUser } from '@models/index';
import { AccountUserDrawerService, AddressService } from '@services/index';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  addressForm: FormGroup;
  user: IUser | null = null;
  isSubmitting = false;

  get title(): FormControl {
    return this.addressForm.get('title') as FormControl;
  }

  get street(): FormControl {
    return this.addressForm.get('street') as FormControl;
  }

  get city(): FormControl {
    return this.addressForm.get('city') as FormControl;
  }

  get zipCode(): FormControl {
    return this.addressForm.get('zipCode') as FormControl;
  }

  get country(): FormControl {
    return this.addressForm.get('country') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private addressService: AddressService,
    private accountUserDrawerService: AccountUserDrawerService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.addressForm = this.formBuilder.group({
      title: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      state: [''],
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.isSubmitting = true;
      this.snackBar.open('Envoi des données...', 'Fermer', { duration: 4004 });

      const addressData = this.addressForm.value;
      this.saveAddress(addressData);
    } else {
      this.snackBar.open('Formulaire non valide!', 'Fermer', {
        duration: 4004,
      });
    }
  }

  saveAddress(addressData: IAddress): void {
    if (this.user) {
      addressData.userId = this.user.id;

      const saveOperation = this.addressService.addAddress(addressData);

      saveOperation?.subscribe({
        next: () => {
          this.snackBar.open('Adresse sauvegardée avec succès !', 'Fermer', {
            duration: 4004,
          });
          this.router.navigate(['/account/user/profile']);
          this.accountUserDrawerService.toggleDrawer();
        },
        error: (error: any) => {
          this.snackBar.open(
            "Erreur lors de la sauvegarde de l'adresse !",
            'Fermer',
            { duration: 4004 }
          );
        },
        complete: () => {
          this.isSubmitting = false;
          this.snackBar.dismiss();
        },
      });
    }
  }

  onReset(): void {
    this.addressForm.reset();
    this.snackBar.open('Formulaire réinitialisé !', 'Fermer', {
      duration: 4004,
    });
  }

  goBackToPreviousPage(): void {
    if (this.user) {
      this.router.navigate(['/account/user/profile']);
      this.accountUserDrawerService.toggleDrawer();
    }
  }
}
