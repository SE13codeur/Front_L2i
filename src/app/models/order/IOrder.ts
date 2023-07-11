import { OrderStatus } from './OrderStatus';
import { IOrderLine } from './IOrderLine';
import { IAddress, IUser } from '..';

export interface IOrder {
  id: number;
  orderNumber: string;
  user?: IUser;
  totalPriceHT: number;
  totalPriceTTC: number;
  status: OrderStatus;
  date?: Date;
  orderLines?: IOrderLine[];
  billingAddress?: IAddress;
  shippingAddress?: IAddress;
}
