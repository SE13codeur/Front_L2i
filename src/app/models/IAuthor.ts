import { IItem } from './item/index';

export interface IAuthor {
  id: number;
  firstname: string;
  lastname: string;
  books?: IItem[];
}
