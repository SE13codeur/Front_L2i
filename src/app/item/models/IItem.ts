import { IAuthor } from '@m/IAuthor';
import { IEditor } from '@m/IEditor';
import { ICategoryItem } from './ICategoryItem';

export default interface IItem {
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
