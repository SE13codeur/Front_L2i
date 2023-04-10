import { Item } from '@/models/IMeilisearchItem';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  itemList$: Observable<Item[]> | undefined;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.itemList$ = this.itemService
      .getItemList()
      .pipe(map((itemList) => (itemList as any).books));
  }

  openItemDetails(item: Item) {
    this.router.navigate(['/items', item.id]);
  }
}
