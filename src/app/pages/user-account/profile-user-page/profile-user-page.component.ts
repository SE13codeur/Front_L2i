import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth-s/index';
import { IAddress, IUser } from '@models/user';
import { AddressService, AdminAuthService } from '@services/index';
import {
  AccountUserDrawerService,
  UserService,
  UserStoreService,
} from '@services/user';
import { of, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css'],
})
export class ProfileUserPageComponent implements OnInit {
  userForm!: FormGroup;

  get username(): FormControl {
    return this.userForm.get('username') as FormControl;
  }

  get firstname(): FormControl {
    return this.userForm.get('firstname') as FormControl;
  }

  get lastname(): FormControl {
    return this.userForm.get('lastname') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  user: IUser | null = null;
  isSubmitting = false;
  addresses!: IAddress[];
  selectedAddress!: IAddress | null;

  displayedColumns: string[] = [
    'title',
    'street',
    'city',
    'state',
    'zipCode',
    'country',
  ];
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private accountUserDrawerService: AccountUserDrawerService,
    private addressService: AddressService,
    private adminAuthService: AdminAuthService
  ) {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.isAdmin = true;
    }
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.userStoreService.user$
      .pipe(
        tap((user) => {
          this.user = user;
          this.userForm.patchValue({
            firstname: user?.firstname,
            lastname: user?.lastname,
            username: user?.username,
            email: user?.email,
            password: user?.password,
          });
        }),
        switchMap((user) => {
          if (user) {
            this.addressService.getAddressesByUserId(user.id);
            return this.addressService.addresses$;
          } else {
            return of([]);
          }
        })
      )
      .subscribe((addresses) => {
        this.addresses = addresses;
        if (this.user) {
          this.user.addresses = addresses;
        }
      });
  }

  displayAddressDetails(id: number): void {
    const address = this.addresses.find((address) => address.id === id);
    this.selectedAddress = address || null;
  }

  populateForm(): void {
    if (this.user) {
      this.userService.getUserById(this.user.id).subscribe({
        next: (user: IUser) => {
          this.user = user;
          // Update form controls
          this.userForm.patchValue({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
          });

          this.snackBar.open('Données chargées avec succès!', 'Fermer', {
            duration: 5005,
          });
        },
        error: (error: any) => {
          this.snackBar.open(
            'Erreur lors du chargement des données!',
            'Fermer',
            { duration: 5005 }
          );
        },
      });
    } else {
      this.snackBar.open("Aucun ID d'utilisateur fourni !", 'Fermer', {
        duration: 5005,
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.snackBar.open('Envoi des données...', 'Fermer', { duration: 5005 });

      const userData = this.userForm.value;
      this.saveUser(userData);
    } else {
      this.snackBar.open('Formulaire non valide!', 'Fermer', {
        duration: 5005,
      });
    }
  }

  saveUser(userData: IUser): void {
    if (this.user) {
      userData.id = this.user.id;

      const saveOperation = this.userService.updateUser(userData);

      saveOperation.subscribe({
        next: (user) => {
          this.snackBar.open('Données sauvegardées avec succès !', 'Fermer', {
            duration: 4004,
          });
          setTimeout(() => {
            this.snackBar.open('Veuillez vous reconnecter !', 'Fermer', {
              duration: 7007,
            });
          }, 4004);

          this.router.navigate(['/auth/login']);
        },
        error: (error: any) => {
          this.snackBar.open(
            "Erreur lors de la sauvegarde de l'utilisateur!",
            'Fermer',
            { duration: 5005 }
          );
        },
      });
    } else {
      this.snackBar.open('Veuillez vous reconnecter !', 'Fermer', {
        duration: 5005,
      });
      this.router.navigate(['/auth/login']);
    }
  }

  onReset(): void {
    this.userForm.reset();
    this.snackBar.open('Formulaire réinitialisé !', 'Fermer', {
      duration: 5005,
    });
  }

  goToAddressForm(): void {
    if (this.user) {
      this.router.navigate(['/account/user/profile/address']);
      this.accountUserDrawerService.closeDrawer();
    }
  }

  goBack(): void {
    if (this.user) {
      this.router.navigate(['/items/books']);
      this.accountUserDrawerService.toggleDrawer();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
