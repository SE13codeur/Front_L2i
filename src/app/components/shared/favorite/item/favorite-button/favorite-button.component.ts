import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStoreService } from '@services/index';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css'],
})
export class FavoriteButtonComponent implements OnInit {
  itemId!: number;
  isFavoriteItem$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.itemId = +id;
      this.isFavoriteItem$ = this.userStoreService.isItemFavorite(this.itemId);
    }
  }

  toggleFavorite() {
    this.isFavoriteItem$.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.userStoreService.removeFromFavorites(this.itemId);
      } else {
        this.userStoreService.addToFavorites(this.itemId);
      }
    });
  }
}
