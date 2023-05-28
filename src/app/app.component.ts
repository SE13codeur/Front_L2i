import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartDrawerService, SearchFocusService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front_L2i';
  isDrawerOpened$: Observable<boolean> | undefined;

  constructor(
    private router: Router,
    private searchFocusService: SearchFocusService,
    private cartDrawerService: CartDrawerService
  ) {}

  ngOnInit(): void {
    this.isDrawerOpened$ = this.cartDrawerService.isDrawerOpened$;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.searchFocusService.triggerFocus();
      });
  }

  toggleDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  closeDrawer() {
    this.cartDrawerService.closeDrawer();
  }
}
