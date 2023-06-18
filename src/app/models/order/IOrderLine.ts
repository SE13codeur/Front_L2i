import { IItem, ITVAItem } from '@models/item';
import { IOrder } from './IOrder';

export interface IOrderLine {
  id?: number;
  orderedQuantity: number;
  unitPriceHT: number;
  unitPriceTTC: number;
  tva?: ITVAItem;
  order?: IOrder;
  book?: IItem;
}
