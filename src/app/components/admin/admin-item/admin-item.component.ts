import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import IItem, { IAuthor, ICategoryItem, IEditor } from '@m/IItem';
import { AdminCategoryService } from '@s/admin/admin-category.service';
import { AdminAuthorService } from '@s/admin/admin-author.service';
import { AdminEditorService } from '@s/admin/admin-editor.service';
import { AdminItemService } from '@s/admin/admin-item.service';
import { ItemService } from '@s/search/item.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css'],
})
export class AdminItemComponent implements OnInit {
  itemForm!: FormGroup;
  item: IItem | undefined;
  itemId: number | null = null;
  authors: IAuthor[] = [];
  editors: IEditor[] = [];
  categories: ICategoryItem[] = [];
  isSubmitting = false;
  isAddRouting = !!this.route.snapshot.paramMap.get('id') ? false : true;
  constructor(
    private fb: FormBuilder,
    private adminItemService: AdminItemService,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private adminAuthorService: AdminAuthorService,
    private adminEditorService: AdminEditorService,
    private adminCategoryService: AdminCategoryService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm(): void {
    this.itemForm = this.fb.group({
      imageUrl: ['', Validators.required],
      isbn13: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      regularPrice: ['', [Validators.required, Validators.min(0)]],
      inStock: [true],
      quantityInStock: ['', [Validators.required, Validators.min(1)]],
      rating: [
        this.isAddRouting ? 5 : this.item?.rating,
        [Validators.required],
      ],
      authors: this.fb.array([], Validators.required),
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
      language: [this.isAddRouting ? 'french' : this.item?.language],
      version: ['', Validators.required],
      newCollection: [false],
    });
  }

  ngOnInit(): void {
    this.adminAuthorService.getAuthors().subscribe((authors) => {
      this.authors = authors;
      this.setAuthorControls();
    });

    this.adminEditorService.getEditors().subscribe((editors) => {
      this.editors = editors;
    });

    this.adminCategoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    let tempId = this.route.snapshot.paramMap.get('id');
    this.itemId = tempId && !isNaN(parseInt(tempId)) ? parseInt(tempId) : null;
    if (this.itemId) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (this.itemId) {
      this.itemService.getItemById(this.itemId).subscribe({
        next: (item: IItem) => {
          this.item = item;

          // Update form controls
          this.itemForm.patchValue({
            imageUrl: item.imageUrl,
            isbn13: item.isbn13,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            regularPrice: item.regularPrice,
            quantityInStock: item.quantityInStock,
            rating: item.rating,
            editor: item.editor.id,
            category: item.category.id,
            pages: item.pages,
            year: item.year,
            language: item.language,
            version: item.version,
            newCollection: item.newCollection,
          });

          this.snackBar.open('Données chargées avec succès!', 'Fermer', {
            duration: 4004,
          });
        },
        error: (error: any) => {
          this.snackBar.open(
            'Erreur lors du chargement des données!',
            'Fermer',
            { duration: 4004 }
          );
        },
      });
    } else {
      this.snackBar.open("Aucun ID d'article fourni!", 'Fermer', {
        duration: 4004,
      });
    }
  }

  setAuthorControls(): void {
    const itemAuthorsIds = this.item?.authors.map((author) => author.id) || [];
    const authorControls = this.authors.map(
      (author) => new FormControl(itemAuthorsIds.includes(author.id))
    );
    this.itemForm.setControl('authors', new FormArray(authorControls));
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      this.snackBar.open('Envoi des données...', 'Fermer', { duration: 4004 });
      const itemData = this.processFormData();
      this.saveItem(itemData);
    } else {
      this.snackBar.open('Formulaire non valide!', 'Fermer', {
        duration: 4004,
      });
    }
  }

  processFormData(): any {
    const itemData = this.itemForm.value;
    itemData.authors = itemData.authors
      .map((checked: boolean, i: number) =>
        checked ? this.authors[i].id : null
      )
      .filter((v: string | null) => v !== null);

    itemData.authors = this.authors.filter((author) =>
      itemData.authors.includes(author.id)
    );

    let editorObject = this.editors.find(
      (editor) => editor.id == itemData.editor
    );
    itemData.editor = editorObject;

    let categoryObject = this.categories.find(
      (category) => category.id == itemData.category
    );
    itemData.category = categoryObject;

    itemData.rating = this.isAddRouting ? 5 : this.item?.rating;
    itemData.language = this.isAddRouting ? 'french' : this.item?.language;

    return itemData;
  }

  saveItem(itemData: any): void {
    const saveOperation = this.itemId
      ? this.adminItemService.editItem(this.itemId, itemData)
      : this.adminItemService.addItem(itemData);

    saveOperation.subscribe({
      next: () => {
        this.snackBar.open('Article sauvegardé avec succès!', 'Fermer', {
          duration: 4004,
        });
        this.router.navigate(['/items/books']);
      },
      error: (error: any) => {
        this.snackBar.open(
          "Erreur lors de la sauvegarde de l'article!",
          'Fermer',
          { duration: 4004 }
        );
      },
    });
  }

  onReset(): void {
    this.itemForm.reset();
    this.snackBar.open('Formulaire réinitialisé!', 'Fermer', {
      duration: 4004,
    });
  }

  goBack(): void {
    if (this.itemId) {
      this.router.navigate(['/items/books', this.itemId]);
    } else {
      this.router.navigate(['/items/books']);
    }
  }
}
