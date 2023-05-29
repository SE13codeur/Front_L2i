import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDrawerService, CartItemQuantityService } from '@services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  totalItemsInCart$: Observable<number>;
  @ViewChild('dialogContent', { static: false }) dialogContent:
    | TemplateRef<any>
    | undefined;

  constructor(
    private cartDrawerService: CartDrawerService,
    private cartItemQuantityService: CartItemQuantityService,
    public dialog: MatDialog
  ) {
    this.totalItemsInCart$ = this.cartItemQuantityService.getTotalItemsInCart();
  }

  openDrawer(event: Event) {
    event.stopPropagation();

    this.totalItemsInCart$
      .subscribe((totalItemsInCart) => {
        if (totalItemsInCart > 0) {
          this.cartDrawerService.toggleDrawer();
        } else {
          this.openDialog();
        }
      })
      .unsubscribe();
  }

  openDialog() {
    if (this.dialogContent) {
      const dialogRef = this.dialog.open(this.dialogContent);

      setTimeout(() => {
        dialogRef.close();
      }, 3003);

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
