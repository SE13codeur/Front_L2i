import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '@auth-s/index';
import { Router } from '@angular/router';
import { IUser } from '@models/index';
import { CartDrawerService } from '@services/cart';
import { AccountUserDrawerService } from '@services/index';

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
    private authService: AuthService,
    private cartDrawerService: CartDrawerService,
    private accountUserDrawerService: AccountUserDrawerService
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
      this.authService.getOpenCartAfterLogin().subscribe((shouldOpenCart) => {
        if (shouldOpenCart) {
          this.cartDrawerService.openDrawer();
          this.authService.setOpenCartAfterLogin(false);
        } else {
          this.authService
            .getOpenAccountDrawerAfterLogin()
            .subscribe((shouldOpenAccountDrawer) => {
              if (shouldOpenAccountDrawer) {
                this.accountUserDrawerService.openDrawer();
                this.authService.setOpenAccountDrawerAfterLogin(false);
              }
            });
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
