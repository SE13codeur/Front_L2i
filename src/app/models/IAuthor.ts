import IItem from '@item/models/IItem';

export interface IAuthor {
  id: number;
  firstname: string;
  lastname: string;
  books?: IItem[];
}
