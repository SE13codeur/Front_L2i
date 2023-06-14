import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css'],
})
export class UserAccountPageComponent implements OnInit {
  isAccountCustomerDrawerOpened$: Observable<boolean> | undefined;

  constructor() {}

  ngOnInit(): void {}

  closeAccountCustomerDrawer() {
    console.log('TODO : toggle ACCOUNT CUSTOMER drawer');
  }
}
