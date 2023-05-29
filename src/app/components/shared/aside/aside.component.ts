import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartButtonService, CartDrawerService } from '@services/index';
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
    private cartButtonService: CartButtonService
  ) {}

  ngOnInit() {
    let initialValue = localStorage.getItem('totalItemsInCart');
    if (initialValue) {
      this.totalItemsInCart$.next(parseInt(initialValue));
    }

    this.cartButtonService.getTotalItemsInCart().subscribe((count) => {
      this.totalItemsInCart$.next(count);
      localStorage.setItem('totalItemsInCart', count.toString());
    });
  }

  openDrawer(event: Event) {
    event.stopPropagation();
    this.cartDrawerService.toggleDrawer();
  }
}
