import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDrawerService {
  private isDrawerOpen = new BehaviorSubject<boolean>(false);
  isDrawerOpened$ = this.isDrawerOpen.asObservable();

  toggleDrawer() {
    this.isDrawerOpen.next(!this.isDrawerOpen.getValue());
  }

  closeDrawer() {
    this.isDrawerOpen.next(false);
  }

  isDrawerOpened() {
    return this.isDrawerOpened$;
  }
}
