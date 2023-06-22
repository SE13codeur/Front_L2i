import { Component } from '@angular/core';
import { AccountUserDrawerService } from '@services/index';

@Component({
  selector: 'app-account-user-button',
  templateUrl: './account-user-button.component.html',
  styleUrls: ['./account-user-button.component.css'],
})
export class AccountUserButtonComponent {
  constructor(private accountUserDrawerService: AccountUserDrawerService) {}

  openDrawer(event: Event) {
    event.stopPropagation();
    this.accountUserDrawerService.toggleDrawer();
    console.log('drawer clicked');
  }
}
