import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MeiliSearchService } from '@s/meilisearch.service';
import { IMeilisearchItem } from '@m/IMeilisearchItem';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnDestroy, OnInit {
  searchResults$: Observable<IMeilisearchItem[]> | undefined;
  private readonly destroy$ = new Subject<void>();
  searchInput = new FormControl('');

  constructor(
    private readonly meiliSearchService: MeiliSearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(303), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.search(query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(query: string): void {
    this.meiliSearchService
      .search(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.router.navigate(['/items']);
      });
  }
}
