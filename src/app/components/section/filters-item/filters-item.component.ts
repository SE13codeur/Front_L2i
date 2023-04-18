import { Component } from '@angular/core';
import {
  Options,
  ChangeContext,
  PointerType,
  LabelType,
} from '@angular-slider/ngx-slider';
import { FiltersService } from '@s/filters.service';

@Component({
  selector: 'app-filters-item',
  templateUrl: './filters-item.component.html',
  styleUrls: ['./filters-item.component.css'],
})
export class FiltersItemComponent {
  selectedCategories: string[] = [];
  selectedAuthors: string[] = [];
  selectedRatings: number[] = [];
  categories = [
    'Livres IT',
    'Livres Cuisines',
    'Livres Coaching',
    'Vidéos IT',
    'Vidéos Cuisines',
    'Vidéos Coaching',
  ];

  authors = ['Auteur 1', 'Auteur 2', 'Auteur 3'];

  priceMin: number = 10;
  priceMax: number = 199;
  options: Options = {
    floor: 11,
    ceil: 199,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min :</b> $' + value;
        case LabelType.High:
          return '<b>Max :</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };

  ratings = [
    '1 étoile et plus',
    '2 étoiles et plus',
    '3 étoiles et plus',
    '4 étoiles et plus',
    '5 étoiles',
  ];

  constructor(private filtersService: FiltersService) {}

  onCategoryChange(category: string, checked: boolean) {
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (item) => item !== category
      );
    }
    this.filtersService.updateCategory(this.selectedCategories);
  }

  onAuthorChange(author: string, checked: boolean) {
    if (checked) {
      this.selectedAuthors.push(author);
    } else {
      this.selectedAuthors = this.selectedAuthors.filter(
        (item) => item !== author
      );
    }
    this.filtersService.updateAuthor(this.selectedAuthors);
  }

  onPriceMinChange(newPriceMin: number) {
    this.filtersService.updatePriceMin(newPriceMin);
  }

  onPriceMaxChange(newPriceMax: number) {
    this.filtersService.updatePriceMax(newPriceMax);
  }

  onRatingChange(rating: number, checked: boolean) {
    if (checked) {
      this.selectedRatings.push(rating);
    } else {
      this.selectedRatings = this.selectedRatings.filter(
        (item) => item !== rating
      );
    }
    this.filtersService.updateRating(this.selectedRatings);
  }
}
