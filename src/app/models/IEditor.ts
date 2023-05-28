import { IItem } from './item';

export interface IEditor {
  id: number;
  name: string;
  books?: IItem[];
}
