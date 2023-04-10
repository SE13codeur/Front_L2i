export interface ICategoryItem {
  id: number;
  name: string;
  parentId?: number;
}

export interface MeiliSearchModel {
  meiliSearchId: string;
  indexUid: string;
}

export interface Item extends MeiliSearchModel {
  id: number;
  book: IBook;
  imageUrl: string;
  description: string;
  category: ICategoryItem;
  regularPrice: number;
  inStock: boolean;
  isNewCollection: boolean;
  language: string;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
  indexUid: string;
}

export interface IBook extends Item {
  id: number;
  isbn13: string;
  title: string;
  subtitle: string;
  summary: string;
  authors: IAuthor[];
  editor: IEditor;
  category: ICategoryItem;
  pages: string;
  year: string;
  version: number;
}

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  books?: IBook[];
}

export interface IEditor {
  id: number;
  name: string;
  books?: IBook[];
}

export interface IMeilisearchResult extends ICategoryItem, Item {
  uid: string;
}
