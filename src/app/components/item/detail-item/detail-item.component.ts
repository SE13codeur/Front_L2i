import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { MeiliSearchService } from '@s/meilisearch.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  item$: Observable<IMeilisearchItem | null>;
  item: IMeilisearchItem | null = null;
  showReviews = false;

  constructor(
    private route: ActivatedRoute,
    private meiliSearchService: MeiliSearchService,
    private location: Location
  ) {
    this.item$ = this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) =>
        this.meiliSearchService.getItemById(id).pipe(catchError(() => of(null)))
      )
    );
  }

  ngOnInit(): void {
    this.item$.subscribe((item) => {
      this.item = item;
    });
  }

  goBackToListItems(): void {
    this.location.back();
  }

  toggleShowReviews(): void {
    this.showReviews = !this.showReviews;
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  setRating(newRating: number): void {
    if (this.item) {
      this.item.rating = newRating;
    }
    // TODO : mettre à jour la base de données
    console.log('New rating:', newRating);
  }
}
