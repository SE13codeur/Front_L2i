import IItem from '@item/models/IItem';

export interface IEditor {
  id: number;
  name: string;
  books?: IItem[];
}
