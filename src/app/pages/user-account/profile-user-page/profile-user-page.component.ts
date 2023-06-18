import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer, IUser } from '@models/user';
import { UserService } from '@services/user';
@Component({
  selector: 'app-profile-user-page',
  templateUrl: './profile-user-page.component.html',
  styleUrls: ['./profile-user-page.component.css'],
})
export class ProfileUserPageComponent implements OnInit {
  userForm!: FormGroup;
  user: IUser | ICustomer | undefined;
  userId: number | null = null;
  isSubmitting = false;
  isCustomer: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: [''],
      shippingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: [''],
        country: [''],
      }),
    });
  }

  ngOnInit(): void {
    let tempId = this.route.snapshot.paramMap.get('id');
    this.userId = tempId && !isNaN(parseInt(tempId)) ? parseInt(tempId) : null;

    if (this.userId) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: IUser | ICustomer) => {
          this.user = user;
          this.isCustomer = 'phoneNumber' in user;

          // Update form controls
          this.userForm.patchValue({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
            phoneNumber: this.isCustomer ? (user as ICustomer).phoneNumber : '',
            shippingAddress: this.isCustomer
              ? (user as ICustomer).shippingAddress
              : '',
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
      this.snackBar.open("Aucun ID d'utilisateur fourni!", 'Fermer', {
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

  saveUser(userData: IUser | ICustomer): void {
    const saveOperation = this.userId
      ? this.userService.editUser(this.userId, userData)
      : this.userService.addUser(userData);

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
    this.snackBar.open('Formulaire réinitialisé!', 'Fermer', {
      duration: 4004,
    });
  }

  goBack(): void {
    if (this.userId) {
      this.router.navigate(['/users', this.userId]);
    } else {
      this.router.navigate(['/users']);
    }
  }
}
