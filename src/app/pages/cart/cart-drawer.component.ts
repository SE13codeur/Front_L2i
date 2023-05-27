import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-cart-drawer',
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  @Input() sidenav: MatSidenav | undefined;
}
