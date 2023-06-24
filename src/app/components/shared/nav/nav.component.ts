import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountUserDrawerService,
  AdminAuthService,
  CartDrawerService,
} from '@services/index';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isAdmin = false;
  searchPlaceholder = 'Rechercher';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private adminAuthService: AdminAuthService,
    private cartDrawerService: CartDrawerService,
    private accountUserDrawerService: AccountUserDrawerService
  ) {}

  ngOnInit(): void {
    if (this.adminAuthService.isAdminAuthenticated$) {
      this.adminAuthService.isAdminAuthenticated$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    }
    this.updateSearchPlaceholder();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateSearchPlaceholder();
  }

  private updateSearchPlaceholder() {
    if (window.innerWidth > 889 || window.innerWidth < 777) {
      this.searchPlaceholder = 'Rechercher';
    } else {
      this.searchPlaceholder = '...';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let yOffset = window.pageYOffset;
    let element = this.el.nativeElement.querySelector('.nav-container');

    if (yOffset > 0) {
      this.renderer.addClass(element, 'nav-container-scrolled');
    } else {
      this.renderer.removeClass(element, 'nav-container-scrolled');
    }
  }

  toggleCartDrawer() {
    this.cartDrawerService.toggleDrawer();
  }

  toggleAccountUserDrawer() {
    this.accountUserDrawerService.toggleDrawer();
  }

  goToAddItem(): void {
    this.router.navigate([`/admin/items/books/`]);
  }
}
