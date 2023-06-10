import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { CartDrawerService, SearchFocusService } from '@services/index';
import { CartState } from '@store/index';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front_L2i';
  isDrawerOpened$: Observable<boolean> | undefined;
  @Select(CartState.getCartTotalItems) totalItems$:
    | Observable<number>
    | undefined;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private searchFocusService: SearchFocusService,
    private cartDrawerService: CartDrawerService
  ) {}

  ngOnInit(): void {
    this.isDrawerOpened$ = this.cartDrawerService.isDrawerOpened$;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.searchFocusService.triggerFocus();
      });

    this.totalItems$
      ?.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((totalItems) => {
        if (totalItems == 0 && this.cartDrawerService.isDrawerOpened()) {
          this.cartDrawerService.closeDrawer();
        }
      });
  }

  isAuthPage(): boolean {
    return (
      this.router.url === '/auth/login' || this.router.url === '/auth/register'
    );
  }

  toggleDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  closeDrawer() {
    this.cartDrawerService.closeDrawer();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
