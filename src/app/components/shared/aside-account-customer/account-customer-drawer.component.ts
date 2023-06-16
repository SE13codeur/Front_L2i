import { Component, OnInit } from '@angular/core';
import { AccountCustomerDrawerService } from '@services/user';

@Component({
  selector: 'app-account-customer-drawer',
  templateUrl: './account-customer-drawer.component.html',
  styleUrls: ['./account-customer-drawer.component.css'],
})
export class AccountCustomerDrawerComponent implements OnInit {
  constructor(
    private accountCustomerDrawerService: AccountCustomerDrawerService
  ) {}

  ngOnInit(): void {}

  openDrawer(event: Event) {
    event.stopPropagation();
    this.accountCustomerDrawerService.toggleDrawer();
  }
}
