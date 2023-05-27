import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDrawerService {
  private drawerState = new BehaviorSubject(false);
  public isDrawerOpen = this.drawerState.asObservable();

  toggleDrawer() {
    this.drawerState.next(!this.drawerState.value);
  }
}
