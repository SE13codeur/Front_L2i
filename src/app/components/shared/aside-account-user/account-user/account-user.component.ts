import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.css'],
})
export class AccountUserComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  openOrdersPage() {
    this.router.navigate(['/user/account/orders']);
  }
}
