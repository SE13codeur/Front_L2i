import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDrawerService {
  private wasDrawerOpenBeforeLogin = new BehaviorSubject<boolean>(false);
  private isDrawerOpen = new BehaviorSubject<boolean>(false);
  isDrawerOpened$ = this.isDrawerOpen.asObservable();

  toggleDrawer() {
    this.isDrawerOpen.next(!this.isDrawerOpen.getValue());
  }

  openDrawer() {
    this.isDrawerOpen.next(true);
  }

  closeDrawer() {
    this.isDrawerOpen.next(false);
  }

  isDrawerOpened() {
    return this.isDrawerOpened$;
  }

  setWasDrawerOpenBeforeLogin(value: boolean): Observable<boolean> {
    this.wasDrawerOpenBeforeLogin.next(value);
    return this.wasDrawerOpenBeforeLogin.asObservable();
  }

  wasDrawerOpenBeforeLogin$() {
    return this.wasDrawerOpenBeforeLogin.asObservable();
  }
}
