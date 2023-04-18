import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-filters-item',
  templateUrl: './filters-item.component.html',
  styleUrls: ['./filters-item.component.css'],
})
export class FiltersItemComponent {
  categories = [
    'Livres IT',
    'Livres Cuisines',
    'Livres Coaching',
    'Vidéos IT',
    'Vidéos Cuisines',
    'Vidéos Coaching',
  ];

  authors = ['Auteur 1', 'Auteur 2', 'Auteur 3'];

  price = 0;

  ratings = [
    '1 étoile et plus',
    '2 étoiles et plus',
    '3 étoiles et plus',
    '4 étoiles et plus',
    '5 étoiles',
  ];
}
