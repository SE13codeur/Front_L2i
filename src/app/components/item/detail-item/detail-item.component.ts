import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../services/item.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { IBook } from 'src/app/models/ICategoryItem';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  item$: Observable<IBook | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private location: Location
  ) {
    this.item$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.itemService.getItemByISBN13(params.get('isbn13') as string).pipe(
          catchError((err) => {
            console.error(err);
            this.router.navigate(['/not-found']);
            return of(undefined);
          })
        )
      )
    );
  }

  ngOnInit(): void {}

  goBackToListItems(): void {
    this.location.back();
  }
}
