import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { map, Observable } from 'rxjs';
import { IBook } from 'src/app/models/ICategoryItem';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  itemList$: Observable<IBook[]> | undefined;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.itemList$ = this.itemService
      .getItemList()
      .pipe(map((itemList) => (itemList as any).books));
    if (this.router.url === '/articles') {
      this.router.navigate(['/articles/IT']);
    }
  }

  openItemDetails(item: IBook) {
    this.router.navigate(['/item', item.id]);
  }
}
