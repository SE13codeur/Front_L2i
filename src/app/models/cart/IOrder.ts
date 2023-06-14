import { ICartItem, ICustomerInfos } from '@models/index';

export interface IOrder {
  orderNumber: string;
  orderDate: string;
  items: ICartItem[];
  customerInfos: ICustomerInfos;
  totalPriceHT: number;
  totalPriceTTC: number;
}
