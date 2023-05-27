import { Component, OnInit } from '@angular/core';
import { CartDrawerService } from '@s/cart/cart-drawer.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  isDrawerOpen$;

  constructor(private cartDrawerService: CartDrawerService) {
    this.isDrawerOpen$ = this.cartDrawerService.isDrawerOpen$;
  }
}
