import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from 'src/app/models/IBook';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  itemList: IBook[] | undefined;

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {
    this.itemService.getItemList().subscribe((itemList) => {
      this.itemList = itemList;
    });
  }

  goToItemDetail(item: IBook) {
    this.router.navigate(['/item', item.id]);
  }
}
