import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private cartDrawerService: CartDrawerService
  ) {
    this.cartItems$ = this.cartService.getCartItems();
    this.totalItems$ = this.cartService.getTotalItems();
    this.totalTTC$ = this.cartService.getTotalTTC();
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
