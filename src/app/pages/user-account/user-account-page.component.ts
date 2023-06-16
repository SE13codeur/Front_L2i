import { Component, OnInit } from '@angular/core';
import { AccountCustomerDrawerService } from '@services/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css'],
})
export class UserAccountPageComponent implements OnInit {
  isDrawerOpened$: Observable<boolean> | undefined;

  constructor(
    public accountCustomerDrawerService: AccountCustomerDrawerService
  ) {}

  ngOnInit(): void {
    this.isDrawerOpened$ = this.accountCustomerDrawerService.isDrawerOpened$;
  }

  toggleDrawer() {
    this.accountCustomerDrawerService.toggleDrawer();
  }

  closeDrawer() {
    this.accountCustomerDrawerService.closeDrawer();
  }
}
