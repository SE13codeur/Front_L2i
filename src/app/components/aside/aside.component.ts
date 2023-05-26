import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartButtonService } from '@s/cart/cart-button.service';
import { CartService } from '@s/cart/cart.service';
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
    private router: Router
  ) {}

  ngOnInit() {
    let initialValue = localStorage.getItem('totalItemsForCart');
    if (initialValue) {
      this.totalItemsForCart$.next(parseInt(initialValue));
    }

    this.cartButtonService.getTotalItemsForCart().subscribe((count) => {
      this.totalItemsForCart$.next(count);
      localStorage.setItem('totalItemsForCart', count.toString());
    });
  }
}
