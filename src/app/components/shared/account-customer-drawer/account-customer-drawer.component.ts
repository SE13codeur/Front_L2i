import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-customer-drawer',
  templateUrl: './account-customer-drawer.component.html',
  styleUrls: ['./account-customer-drawer.component.css'],
})
export class AccountCustomerDrawerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openAccountCustomerDrawer(event: Event) {
    event.stopPropagation();
  }
}
