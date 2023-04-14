import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchFocusService {
  private focusSearchInputSource$ = new BehaviorSubject<boolean>(false);
  focusSearchInput$ = this.focusSearchInputSource$.asObservable();

  triggerFocus(): void {
    this.focusSearchInputSource$.next(true);
  }

  resetFocusTrigger(): void {
    this.focusSearchInputSource$.next(false);
  }
}
