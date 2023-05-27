import { Component, OnInit } from '@angular/core';
import { CartButtonService } from '@cart/services/cart-button.service';
import { CartDrawerService } from '@cart/services/cart-drawer.service';
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

  openDrawer(event: Event) {
    event.stopPropagation();
    this.cartDrawerService.toggleDrawer();
  }
}
