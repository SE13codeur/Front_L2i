import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartButtonService } from '@s/cart/cart-button.service';
import { CartDrawerService } from '@s/cart/cart-drawer.service';
import { CartService } from '@s/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  totalItemsForCart$ = new BehaviorSubject<number>(0);

  constructor(
    private cartDrawerService: CartDrawerService,
    private cartButtonService: CartButtonService
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

  openDrawer() {
    this.cartDrawerService.toggleDrawer();
  }
}
