import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import IMeilisearchItem from '@m/IItem';
import { AdminItemService } from '@s/admin/admin-item.service';
import { ItemService } from '@s/search/item.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css'],
})
export class AdminItemComponent implements OnInit {
  itemForm!: FormGroup;
  item: IMeilisearchItem | undefined;
  itemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminItemService: AdminItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {
    this.itemForm = this.fb.group({
      imageUrl: ['', Validators.required],
      isbn13: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      regularPrice: ['', [Validators.required, Validators.min(0)]],
      inStock: [false],
      quantityInStock: ['', [Validators.required, Validators.min(1)]],
      authors: ['', Validators.required],
      editor: ['', Validators.required],
      category: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      year: [
        '',
        [
          Validators.required,
          Validators.min(2010),
          Validators.max(new Date().getFullYear()),
        ],
      ],
      language: ['', Validators.required],
      version: ['', Validators.required],
      newCollection: [false],
    });
  }

  ngOnInit(): void {
    if (this.itemId) {
      this.itemService.getItemById(this.itemId).subscribe({
        next: (response: any) => {
          this.item = response;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    } else {
      console.error('Item ID is null');
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const itemData = this.itemForm.value;

      const authorsList = itemData.authors
        .split(',')
        .map((author: string) => author.trim());

      itemData.authors = authorsList.map((authorName: string) => {
        const [firstname, lastname = ''] = authorName.split(' ');
        return { firstname, lastname };
      });

      this.adminItemService.addItem(itemData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/detail', response.id]);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

  onEditItem(): void {}

  onReset(): void {
    this.itemForm.reset();
  }
}
