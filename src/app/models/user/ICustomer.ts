import { IUser } from './IUser';

export interface ICustomer extends IUser {
  phoneNumber?: string;
  billingAddress?: IAddress;
  shippingAddress?: IAddress;
}

export interface IAddress {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}
