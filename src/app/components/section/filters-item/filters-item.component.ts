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
    'Nouveaux Livres IT',
    'Vidéos IT',
    'Nouvelles Vidéos IT',
  ];

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

  yearMin: number = 2010;
  yearMax: number = new Date().getFullYear();
  optionsYear: Options = {
    floor: 2010,
    ceil: new Date().getFullYear(),
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min :</b> ' + value;
        case LabelType.High:
          return '<b>Max :</b> ' + value;
        default:
          return value.toString();
      }
    },
  };

  constructor(private filtersService: FiltersService) {}

  onCategoryChange(categoryId: string, checked: boolean) {
    if (checked) {
      this.selectedCategories.push(categoryId);
    }
    if (!checked) {
      this.selectedCategories = this.selectedCategories.filter(
        (item) => item !== categoryId
      );
    }
    this.filtersService.updateCategories(this.selectedCategories);
  }

  onPriceMinChange(newPriceMin: number) {
    this.filtersService.updatePriceMin(newPriceMin);
  }

  onPriceMaxChange(newPriceMax: number) {
    this.filtersService.updatePriceMax(newPriceMax);
  }

  onYearMinChange(newYearMin: number) {
    this.filtersService.updateYearMin(newYearMin);
  }

  onYearMaxChange(newYearMax: number) {
    this.filtersService.updateYearMax(newYearMax);
  }

  getRatingStars(rating: number | undefined): number[] {
    const fullStars = Math.round(rating || 0);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill(1), ...Array(emptyStars).fill(0)];
  }

  onRatingChange(rating: number, checked: boolean) {
    if (checked) {
      this.selectedRatings.push(rating);
    }
    if (!checked) {
      this.selectedRatings = this.selectedRatings.filter(
        (item) => item !== rating
      );
    }
    this.filtersService.updateRatings(this.selectedRatings);
  }
}
