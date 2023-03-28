import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { IBook } from 'src/app/models/ICategoryItem';

@Component({
  selector: 'app-item-category-nav',
  templateUrl: './item-category-nav.component.html',
  styleUrls: ['./item-category-nav.component.css'],
})
export class ItemCategoryNavComponent implements OnInit {
  categories: string[] = ['IT', 'Science Fiction', 'Mystery']; // categories to display
  activeTab: string = 'IT'; // active tab

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit() {}

  displayBooksByCategory(category: string) {
    this.activeTab = category;
  }
}
