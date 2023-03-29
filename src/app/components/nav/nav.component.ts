import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  totalItems = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.totalItems = count;
    });
  }
}
