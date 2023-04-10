import { Component } from '@angular/core';

@Component({
  selector: 'app-item-category-nav',
  templateUrl: './item-category-nav.component.html',
  styleUrls: ['./item-category-nav.component.css'],
})
export class ItemCategoryNavComponent {
  categories: string[] = ['Livres', 'Vidéos', 'Autres']; // categories to display
  activeTab: string = 'Livres'; // active tab

  constructor() {}

  displayBooksByCategory(category: string) {
    this.activeTab = category;
  }
}
