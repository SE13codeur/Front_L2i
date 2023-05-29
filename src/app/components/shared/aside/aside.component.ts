import { Component, OnInit } from '@angular/core';
import { CartDrawerService, CartItemQuantityService } from '@services/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  totalItemsInCart$ = new BehaviorSubject<number>(0);

  constructor(
    private cartDrawerService: CartDrawerService,
    private cartItemQuantityService: CartItemQuantityService
  ) {}

  ngOnInit() {
    let initialValue = localStorage.getItem('totalItemsInCart');
    if (initialValue) {
      this.totalItemsInCart$.next(parseInt(initialValue));
    }

    this.cartItemQuantityService
      .getTotalItemsInCart()
      .subscribe((totalQuantityItems: number) => {
        this.totalItemsInCart$.next(totalQuantityItems);
        localStorage.setItem('totalItemsInCart', totalQuantityItems.toString());
      });
  }

  openDrawer(event: Event) {
    event.stopPropagation();
    this.cartDrawerService.toggleDrawer();
  }
}
