import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '@s/cart/cart.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  totalItems$: number | null = null;
  isCartPanelOpen$ = this.cartService.toggleCart();

  constructor(
    private cartService: CartService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.cartService.getTotalCartItemsCount().subscribe((count) => {
      this.totalItems$ = count;
    });
  }

  toggleCartDrawer(): void {
    if (this.isCartPanelOpen$) {
      this.goToCart();
    }
  }

  closeCartDrawer(): void {
    if (this.isCartPanelOpen$) {
      this.cartService.closeCart();
      this.location.back();
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
    // event.stopPropagation();
  }
}
