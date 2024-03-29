import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { ItemService, SearchFocusService } from '@services/index';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent implements OnDestroy, OnInit {
  searchInput = new FormControl('');
  @ViewChild('searchInputElement') searchInputElement!: ElementRef;
  @Input() placeholder!: string;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly itemService: ItemService,
    private router: Router,
    private searchFocusService: SearchFocusService
  ) {}

  ngOnInit(): void {
    this.subscribeToFocusEvents();

    this.searchInput.valueChanges
      .pipe(debounceTime(11), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.search(query);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToFocusEvents(): void {
    this.searchFocusService.focusSearchInput$
      .pipe(takeUntil(this.destroy$))
      .subscribe((shouldFocus: any) => {
        if (shouldFocus) {
          this.focusSearchInput();
          this.searchFocusService.resetFocusTrigger();
        }
      });
  }

  search(query: string): void {
    this.itemService.updatedSearch(query).subscribe(() => {
      this.itemService.setSearchValue(query);
      this.router
        // .navigate(['/items'], { queryParams: { q: query } })
        .navigate(['/items/books'])
        .then(() => {
          this.searchFocusService.triggerFocus();
        });
    });
  }

  resetSearchInput(): void {
    this.searchInput.setValue('');
  }

  focusSearchInput(): void {
    setTimeout(() => {
      this.searchInputElement.nativeElement.focus();
    }, 0);
  }
}
