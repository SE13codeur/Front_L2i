import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class OrderActivateCartGuard implements CanActivate {
  constructor(private cartService: CartService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartService.getTotalItems().pipe(
      map((totalItems) => {
        if (totalItems === 0) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
      switchMap((canActivateBasedOnTotalItems) => {
        if (!canActivateBasedOnTotalItems) {
          return of(false);
        }

        return this.cartService.getTotalTTC().pipe(
          map((total) => {
            if (total === 0) {
              this.router.navigate(['/']);
              return false;
            }
            return true;
          })
        );
      })
    );
  }
}
