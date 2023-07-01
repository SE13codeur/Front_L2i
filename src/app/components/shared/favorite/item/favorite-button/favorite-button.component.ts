import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '@models/index';
import { UserStoreService, ItemService } from '@services/index';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  item!: IItem;
  isFavoriteItem$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private userStoreService: UserStoreService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.itemService.getItemById(+id).subscribe((item) => {
        this.item = item;
        this.isFavoriteItem$ = this.userStoreService.isFavoriteItem(this.item);
      });
    }
  }

  toggleFavorite() {
    this.isFavoriteItem$?.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.userStoreService
          .removeFromFavorites(this.item.id)
          .subscribe(() => {
            this.isFavoriteItem$ = this.userStoreService.isFavoriteItem(
              this.item
            );
          });
      } else {
        this.userStoreService.addToFavorites(this.item).subscribe(() => {
          this.isFavoriteItem$ = this.userStoreService.isFavoriteItem(
            this.item
          );
        });
      }
    });
  }
}
