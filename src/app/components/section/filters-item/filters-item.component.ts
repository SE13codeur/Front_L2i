import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FiltersService } from '@s/search/filters.service';
import { ItemService } from '@s/search/item.service';
import { PaginationService } from '@s/pagination/pagination.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-filters-item',
  templateUrl: './filters-item.component.html',
  styleUrls: ['./filters-item.component.css'],
})
export class FiltersItemComponent {
  selectedCategories: string[] = [];
  selectedRatings: number[] = [];

  @ViewChild('frenchBooks') frenchBooks: MatCheckbox | undefined;
  @ViewChild('englishBooks') englishBooks: MatCheckbox | undefined;
  @ViewChild('englishMovies') englishMovies: MatCheckbox | undefined;
  @ViewChild('frenchMovies') frenchMovies: MatCheckbox | undefined;

  priceMin: number = 10;
  priceMax: number = 199;
  options: Options = {
    floor: 11,
    ceil: 199,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min :</b> €' + value;
        case LabelType.High:
          return '<b>Max :</b> €' + value;
        default:
          return '€' + value;
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

  constructor(
    private filtersService: FiltersService,
    private ItemService: ItemService,
    private paginationService: PaginationService
  ) {}

  onSubcategoryChange(
    parentId: string,
    subcategoryId: string,
    isChecked: boolean,
    parentCheckbox: MatCheckbox,
    subCheckbox1: MatCheckbox,
    subCheckbox2: MatCheckbox
  ): void {
    this.onCategoryChange(subcategoryId, isChecked);

    if (!isChecked && !subCheckbox1.checked && !subCheckbox2.checked) {
      parentCheckbox.checked = false;
      this.onCategoryChange(parentId, false);
    } else if (isChecked && subCheckbox1.checked && subCheckbox2.checked) {
      parentCheckbox.checked = true;
      this.onCategoryChange(parentId, true);
    }
  }

  onCategoryChange(categoryId: string, checked: boolean) {
    if (categoryId === '2') {
      if (this.frenchBooks) {
        this.frenchBooks.checked = checked;
        this.onCategoryChange('4', checked);
      }
      if (this.englishBooks) {
        this.englishBooks.checked = checked;
        this.onCategoryChange('5', checked);
      }
    }

    if (categoryId === '3') {
      if (this.englishMovies) {
        this.englishMovies.checked = checked;
        this.onCategoryChange('6', checked);
      }
      if (this.frenchMovies) {
        this.frenchMovies.checked = checked;
        this.onCategoryChange('7', checked);
      }
    }

    if (checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (item) => item !== categoryId
      );
    }
    this.filtersService.updateCategories(this.selectedCategories);
    this.onFilterChange();
  }

  onPriceMinChange(newPriceMin: number) {
    this.filtersService.updatePriceMin(newPriceMin);
    this.onFilterChange();
  }

  onPriceMaxChange(newPriceMax: number) {
    this.filtersService.updatePriceMax(newPriceMax);
    this.onFilterChange();
  }

  onYearMinChange(newYearMin: number) {
    this.filtersService.updateYearMin(newYearMin);
    this.onFilterChange();
  }

  onYearMaxChange(newYearMax: number) {
    this.filtersService.updateYearMax(newYearMax);
    this.onFilterChange();
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
    this.onFilterChange();
  }

  onFilterChange() {
    const filterString = this.filtersService.getFilterString();

    // Set current page and itemsPerPage
    const itemsPerPage = 12;
    this.paginationService.updateCurrentPage(1);

    // switchMap for combining currentPage$ and getItemsByPage
    this.paginationService.currentPage$
      .pipe(
        switchMap((currentPage) =>
          this.ItemService.getItemsByPage(
            currentPage,
            itemsPerPage,
            filterString
          )
        )
      )
      .subscribe();
    this.paginationService.updateCurrentPage(1);
  }
}
