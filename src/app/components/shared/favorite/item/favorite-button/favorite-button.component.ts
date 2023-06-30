import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from '@models/index';
import { UserStoreService } from '@services/index';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.item != null && id != null) {
      this.item.id = +id;
      this.isFavoriteItem$ = this.userStoreService.isItemFavorite(this.item.id);
    }
  }

  toggleFavorite() {
    this.isFavoriteItem$?.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.userStoreService.removeFromFavorites(this.item);
      } else {
        this.userStoreService.addToFavorites(this.item);
      }
    });
  }
}
