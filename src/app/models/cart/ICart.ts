import { ICustomer, ICartItem } from '@models/index';

export interface ICart {
  cartItems: ICartItem[];
  user: ICustomer;
  totalPriceHT: number;
  totalPriceTTC: number;
}
