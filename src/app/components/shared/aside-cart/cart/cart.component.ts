import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CheckAuthService } from '@auth-s/check-auth.service';
import { AuthService } from '@auth-s/index';
import { ICartItem } from '@models/cart';
import { CartDrawerService, CartService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @ViewChild('errorDialog') errorDialog: TemplateRef<any> | undefined;
  cartItems$: Observable<ICartItem[]>;
  totalItems$: Observable<number>;
  totalTTC$: Observable<number>;

  isAuthenticated$: Observable<boolean> | undefined;
  username$: Observable<string | null> | undefined;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService,
    private checkAuthService: CheckAuthService,
    private authService: AuthService
  ) {
    this.cartItems$ = this.cartService.getCartItems();
    this.totalItems$ = this.cartService.getTotalItems();
    this.totalTTC$ = this.cartService.getTotalTTC();
    this.username$ = this.authService.getUsername();
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

  orderValidate(): void {
    this.closeCartDrawer();
    if (!this.checkAuthService.checkAuthenticationAndRedirect()) {
      // Redirect to login page and come back to the current state after login
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      });
      return;
    }
    if (!!this.checkAuthService.checkAuthenticationAndRedirect()) {
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
}
