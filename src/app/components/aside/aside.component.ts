import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from 'src/app/models/ICartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
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
}
