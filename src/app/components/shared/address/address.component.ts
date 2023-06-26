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
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  addressForm: FormGroup;

  get street(): FormControl {
    return this.addressForm.get('Address.street') as FormControl;
  }

  get city(): FormControl {
    return this.addressForm.get('Address.city') as FormControl;
  }

  get zipCode(): FormControl {
    return this.addressForm.get('Address.zipCode') as FormControl;
  }

  get country(): FormControl {
    return this.addressForm.get('Address.country') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.addressForm = this.formBuilder.group({
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required],
        state: [''],
      }),
    });
  }
}
