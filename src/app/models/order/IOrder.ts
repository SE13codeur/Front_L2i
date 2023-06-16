import { OrderStatus } from './OrderStatus';
import { IOrderLine } from './IOrderLine';
import { ICustomer } from '..';

export interface IOrder {
  id?: number;
  user?: ICustomer;
  totalPriceHT?: number;
  totalPriceTTC?: number;
  status?: OrderStatus;
  date?: Date;
  orderLines?: IOrderLine[];
}
