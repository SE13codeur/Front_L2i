import { Component, OnInit } from '@angular/core';
import { ICartItem } from '@m/ICartItem';
import { CartService } from '@s/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: ICartItem[] = [];
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'Discounted Price',
    'Action',
  ];

  constructor(private cartService: CartService) {}
  totalCartItems$ = 0;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    this.cartService.getTotalCartItemsCount().subscribe((count) => {
      this.totalCartItems$ = count;
    });
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  increaseItemQty(item: ICartItem): void {
    this.cartService.increaseItemQty(item);
  }

  decreaseItemQty(item: ICartItem): void {
    this.cartService.decreaseItemQty(item);
  }

  removeItem(cartId: ICartItem): void {
    this.cartService.removeItemFromCart(cartId);
  }

  checkout(): void {
    // TODO : the real payment
    // setTimeout(() => {
    //   this.cartService.clearCart();
    //   this.router.navigate(['/checkout']);
    // }, 2002);
  }
}
