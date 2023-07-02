import { Component } from '@angular/core';
import { CheckAuthService } from '@auth-s/index';
import { AccountUserDrawerService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-user-button',
  templateUrl: './account-user-button.component.html',
  styleUrls: ['./account-user-button.component.css'],
})
export class AccountUserButtonComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private accountUserDrawerService: AccountUserDrawerService,
    private checkAuthService: CheckAuthService
  ) {
    this.isAuthenticated$ = this.checkAuthService.isAuthenticated$;
  }

  openDrawer(event: Event) {
    event.stopPropagation();
    this.accountUserDrawerService.toggleDrawer();
  }
}
