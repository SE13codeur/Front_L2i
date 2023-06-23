import { IItem } from '.';

export interface IEditor {
  id: number;
  name: string;
  books?: IItem[];
}
