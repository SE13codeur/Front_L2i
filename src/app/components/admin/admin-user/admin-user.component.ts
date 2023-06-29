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
import { Role, IUser } from '@models/index';
import { AdminAuthService, AdminUserService } from '@services/index';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'],
})
export class AdminUserComponent implements OnInit {
  userForm!: FormGroup;
  user: IUser | null = null;
  userId: number | null = null;
  isSubmitting = false;
  isAdmin = false;

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

  get role(): FormControl {
    return this.userForm.get('role') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private adminUserService: AdminUserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private adminAuthService: AdminAuthService
  ) {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.isAdmin = true;
    }

    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.pipe().subscribe(() => {
      if (this.user) {
        this.isAdmin = true;
      }
    });
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

  saveUser(user: IUser): void {
    const saveOperation = this.userId
      ? this.adminUserService.editUser(user)
      : this.adminUserService.addUser(user);

    saveOperation.subscribe({
      next: () => {
        this.snackBar.open('Utilisateur sauvegardé avec succès!', 'Fermer', {
          duration: 4004,
        });
        this.router.navigate(['/users']);
      },
      error: (error: any) => {
        this.snackBar.open(
          "Erreur lors de la sauvegarde de l'utilisateur!",
          'Fermer',
          { duration: 4004 }
        );
      },
    });
  }

  onReset(): void {
    this.userForm.reset();
    this.snackBar.open('Formulaire réinitialisé !', 'Fermer', {
      duration: 4004,
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/user/list']);
  }
}
