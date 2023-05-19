import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminItemService } from '@s/admin/admin-item.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css'],
})
export class AdminItemComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminItemService: AdminItemService
  ) {
    this.itemForm = this.fb.group({
      imageUrl: ['', Validators.required],
      isbn13: [''],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      regularPrice: ['', [Validators.required, Validators.min(0)]],
      inStock: [false],
      quantityInStock: ['', Validators.required],
      authors: [''],
      editor: [''],
      category: ['', Validators.required],
      pages: ['', Validators.required],
      year: ['', Validators.required],
      language: [''],
      version: [''],
      newCollection: [false],
    });
  }

  ngOnInit(): void {}

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

      this.adminItemService.addItem('books', itemData).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

  onReset(): void {
    this.itemForm.reset();
  }
}
