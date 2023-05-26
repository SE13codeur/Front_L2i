import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from '@s/cart/cart.service';
import { CartButtonService } from '@s/cart/cart-button.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  totalItemsForCart$ = new BehaviorSubject<number>(0);
  isCartPanelOpen$ = this.cartService.toggleCart();

  constructor(
    private cartService: CartService,
    private cartButtonService: CartButtonService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.cartButtonService.getTotalItemsForCart().subscribe((count) => {
      this.totalItemsForCart$.next(count);
    });
  }
}
