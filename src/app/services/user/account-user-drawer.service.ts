import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheckAuthService } from '@auth-s/index';

@Injectable({
  providedIn: 'root',
})
export class AccountUserDrawerService {
  private isDrawerOpen = new BehaviorSubject<boolean>(false);
  isDrawerOpened$ = this.isDrawerOpen.asObservable();

  constructor(private checkAuthService: CheckAuthService) {}

  toggleDrawer() {
    this.checkAuthService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.isDrawerOpen.next(!this.isDrawerOpen.getValue());
      }
    });
  }

  closeDrawer() {
    this.isDrawerOpen.next(false);
  }

  isDrawerOpened() {
    return this.isDrawerOpened$;
  }
}
