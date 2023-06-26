import { IUser, ICartItem } from '@models/index';

export interface ICart {
  cartItems: ICartItem[];
  user: IUser;
}
