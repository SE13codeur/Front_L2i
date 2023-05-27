import { Component, OnInit } from '@angular/core';
import { CartDrawerService } from '@s/cart/cart-drawer.service';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  isDrawerOpened$;

  constructor(private cartDrawerService: CartDrawerService) {
    this.isDrawerOpened$ = this.cartDrawerService.isDrawerOpen$;
  }

  closeDrawer() {
    this.cartDrawerService.closeDrawer();
  }
}
