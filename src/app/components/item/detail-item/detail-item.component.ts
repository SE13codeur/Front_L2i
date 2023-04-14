import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeiliSearchService } from '@s/meilisearch.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { IMeilisearchItem } from '@m/IMeilisearchItem';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private MeiliSearchService: MeiliSearchService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goBackToListItems(): void {
    this.location.back();
  }
}
