import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountCustomerDrawerService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  openDrawer() {
    this.isOpen.next(true);
  }

  closeDrawer() {
    this.isOpen.next(false);
  }
}
