import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICartItem } from '@m/ICartItem';
import { CartButtonService } from '@s/cart/cart-button.service';
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
  @Output() closeClickedDrawer = new EventEmitter();

  constructor(
    private cartService: CartService,
    private cartButtonService: CartButtonService
  ) {}
  totalCartItems$ = 0;

  ngOnInit(): void {}

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  increaseItemQuantity(item: ICartItem): void {
    this.cartButtonService.increaseItemQuantity(item.id);
  }

  decreaseItemQuantity(item: ICartItem): void {
    this.cartButtonService.decreaseItemQuantity(item.id);
  }

  removeItem(cart: ICartItem): void {
    this.cartService.removeItemFromCart(cart.id);
  }

  checkout(): void {
    // TODO : the real payment
    // setTimeout(() => {
    //   this.cartService.clearCart();
    //   this.router.navigate(['/checkout']);
    // }, 2002);
  }
}
