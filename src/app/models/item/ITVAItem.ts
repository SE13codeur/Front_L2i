import { IItem } from './IItem';

export interface ITVAItem {
  id: number;
  tvaType: string;
  tvaRate: number;
  books: IItem[];
}
