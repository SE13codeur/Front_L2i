import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ICartItem } from '../../../models/ICartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isCartOpen = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  closeCart() {}

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  increaseItemQty(item: ICartItem): void {
    this.cartService.increaseItemQty(item);
  }

  decreaseItemQty(item: ICartItem): void {
    this.cartService.decreaseItemQty(item);
  }

  checkout(): void {
    // TODO : the real payment
    // setTimeout(() => {
    //   this.cartService.clearCart();
    //   this.router.navigate(['/checkout']);
    // }, 2002);
  }
}
