import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MeiliSearchService } from '@s/meilisearch.service';
import { IMeilisearchResult } from '@/models/IMeilisearchItem';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css'],
})
export class SearchItemComponent {
  searchResults$: Observable<IMeilisearchResult[]>;

  constructor(private readonly meiliSearchService: MeiliSearchService) {
    this.searchResults$ = meiliSearchService.getSearchResults();
  }

  search(query: string): void {
    this.searchResults$ = this.meiliSearchService.search(query);
  }
}
