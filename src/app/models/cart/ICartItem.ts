import { IItem } from '@models/item';

export interface ICartItem extends IItem {
  quantity: number;
}
