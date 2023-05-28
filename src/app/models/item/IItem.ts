import { IAuthor, IEditor } from '@models/index';
import { ICategoryItem } from './ICategory';

export interface IItem {
  id: number;
  isbn13: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  regularPrice: number;
  rating?: number;
  quantityInStock: number;
  totalSales: number;
  authors: IAuthor[];
  editor: IEditor;
  category: ICategoryItem;
  pages: string;
  year: string;
  language?: string;
  version: number;
  newCollection?: boolean;
}
