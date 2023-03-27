import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { IBook } from '../../models/IBook';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  item: IBook;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemService
      .getItemById(itemId)
      .subscribe((item) => (this.item = item));
  }
}
