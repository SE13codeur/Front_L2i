import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckAuthService } from '@auth-s/check-auth.service';
import { AuthService } from '@auth-s/index';
import { ICartItem } from '@models/cart';
import { IUser } from '@models/index';
import {
  CartDrawerService,
  CartService,
  UserStoreService,
} from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @ViewChild('errorDialog') errorDialog: TemplateRef<any> | undefined;
  @ViewChild('dialogContent', { static: false }) dialogContent:
    | TemplateRef<any>
    | undefined;
  cartItems$: Observable<ICartItem[]>;
  totalItems$: Observable<number>;
  totalTTC$: Observable<number>;
  user$!: Observable<IUser>;

  isAuthenticated$: Observable<boolean> | undefined;
  username$: Observable<string | null> | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService,
    private checkAuthService: CheckAuthService,
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {
    this.cartItems$ = this.cartService.getCartItems();
    this.totalItems$ = this.cartService.getTotalItems();
    this.totalTTC$ = this.cartService.getTotalTTC();
    this.username$ = this.authService.getUsername();
    this.isAuthenticated$ = this.checkAuthService.isAuthenticated$;
  }

  ngOnInit() {
    this.user$ = this.userStoreService.getUser();
  }

  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(itemId);
  }

  updateCartItemQuantity(itemId: number, newQuantity: number): void {
    this.cartService.updateCartItemQuantity(itemId, newQuantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.closeCartDrawer();
    this.router.navigate(['/items/books']);
  }

  closeCartDrawer() {
    this.cartDrawerService.closeDrawer();
  }

  openDialog() {
    if (this.dialogContent) {
      const dialogRef = this.dialog.open(this.dialogContent);

      setTimeout(() => {
        dialogRef.close();
      }, 3003);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  orderValidate(): void {
    this.closeCartDrawer();
    const isAuthenticated =
      this.checkAuthService.checkAuthenticationAndRedirect();
    if (!isAuthenticated) {
      // Redirect to login page and come back to the current state after login
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
      return;
    }
    if (isAuthenticated) {
      this.cartItems$?.subscribe((cartItems) => {
        for (let cartItem of cartItems) {
          if (cartItem.quantity > cartItem.quantityInStock) {
            if (this.errorDialog) {
              const dialogRef = this.dialog.open(this.errorDialog, {
                data: {
                  message: `La quantité commandée pour ${cartItem.title} est supérieure à celle en stock.`,
                },
              });
              setTimeout(() => {
                dialogRef.close();
              }, 4004);
            }
            return;
          }
        }
        this.router.navigate(['/items/orders']);
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
    this.closeCartDrawer();
  }
}
