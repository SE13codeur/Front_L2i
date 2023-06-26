import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@auth-s/index';
import { IUser } from '@models/user';
import { AccountUserDrawerService, UserService } from '@services/user';
@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css'],
})
export class ProfileUserPageComponent implements OnInit {
  userForm!: FormGroup;
  user: IUser | null = null;
  isSubmitting = false;
  isCustomer: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authService: AuthService,
    private accountUserDrawerService: AccountUserDrawerService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: [''],
      addresses: [],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.userForm.patchValue({
        firstname: user?.firstname,
        lastname: user?.lastname,
        username: user?.username,
        email: user?.email,
        password: user?.password,
        addresses: user?.addresses,
      });
    });
  }

  populateForm(): void {
    if (this.user) {
      this.userService.getUserById(this.user.id).subscribe({
        next: (user: IUser) => {
          this.user = user;
          // Update form controls
          this.userForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
          });

          this.snackBar.open('Données chargées avec succès!', 'Fermer', {
            duration: 4004,
          });
        },
        error: (error: any) => {
          this.snackBar.open(
            'Erreur lors du chargement des données!',
            'Fermer',
            { duration: 4004 }
          );
        },
      });
    } else {
      this.snackBar.open("Aucun ID d'utilisateur fourni !", 'Fermer', {
        duration: 4004,
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.snackBar.open('Envoi des données...', 'Fermer', { duration: 4004 });

      const userData = this.userForm.value;
      this.saveUser(userData);
    } else {
      this.snackBar.open('Formulaire non valide!', 'Fermer', {
        duration: 4004,
      });
    }
  }

  saveUser(userData: IUser): void {
    if ('billingAddress' in userData) {
      const saveOperation = this.user
        ? this.userService.editUser(this.user.id, userData as IUser)
        : this.userService.addUser(userData as IUser);

      saveOperation.subscribe({
        next: () => {
          this.snackBar.open('Utilisateur sauvegardé avec succès!', 'Fermer', {
            duration: 4004,
          });
          this.router.navigate(['/account/user/profile']);
        },
        error: (error: any) => {
          this.snackBar.open(
            "Erreur lors de la sauvegarde de l'utilisateur!",
            'Fermer',
            { duration: 4004 }
          );
        },
      });
    } else {
      this.snackBar.open("L'utilisateur n'est pas un client!", 'Fermer', {
        duration: 4004,
      });
    }
  }

  onReset(): void {
    this.userForm.reset();
    this.snackBar.open('Formulaire réinitialisé!', 'Fermer', {
      duration: 4004,
    });
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
