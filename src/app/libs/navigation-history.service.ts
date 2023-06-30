import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/items/books';
  }

  getLastTwoUrls(): string[] {
    return this.history.slice(-2);
  }
}
