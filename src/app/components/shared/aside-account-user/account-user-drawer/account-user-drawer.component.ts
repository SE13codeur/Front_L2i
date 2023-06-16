import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openOrdersPage() {
    this.router.navigate(['/user/account/orders']);
  }
}
