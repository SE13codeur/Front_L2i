export interface IMeilisearchItem {
  id: string;
  isbn13?: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  regularPrice: number;
  rating?: number;
  inStock: boolean;
  quantityInStock: number;
  totalSales: number;
  authors?: IAuthor[];
  editor?: IEditor;
  category: ICategoryItem;
  pages: string;
  year: string;
  language?: string;
  version?: number;
  newCollection: boolean;
}

export interface IAuthor {
  id: number;
  firstname: string;
  lastname: string;
  books?: IMeilisearchItem[];
}

export interface IEditor {
  id: number;
  name: string;
  books?: IMeilisearchItem[];
}

export interface ICategoryItem {
  id: string;
  name: string;
  parentId?: number;
}
