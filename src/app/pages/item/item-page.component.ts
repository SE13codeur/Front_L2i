import { Component } from '@angular/core';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent {
  categories: string[] = ['Livres', 'Vidéos', 'Autres']; // categories to display
  constructor() {}
}
