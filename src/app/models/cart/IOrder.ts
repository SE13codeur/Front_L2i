import { ICartItem } from '@models/index';

export interface IOrder {
  orderNumber: string;
  orderDate: string;
  items: ICartItem[];
  customerInfo: 'ICustomerInfo'; // TODO ajouter l'interface
  totalPriceHT: number;
  totalPriceTTC: number;
}
