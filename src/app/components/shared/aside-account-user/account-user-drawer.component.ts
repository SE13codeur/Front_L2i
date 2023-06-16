import { Component } from '@angular/core';
import { AccountUserDrawerService } from '@services/index';

@Component({
  selector: 'app-account-user-drawer',
  templateUrl: './account-user-drawer.component.html',
  styleUrls: ['./account-user-drawer.component.css'],
})
export class AccountUserDrawerComponent {
  constructor(private accountUserDrawerService: AccountUserDrawerService) {}

  openDrawer(event: Event) {
    event.stopPropagation();
    this.accountUserDrawerService.toggleDrawer();
    console.log('drawer clicked');
  }
}
