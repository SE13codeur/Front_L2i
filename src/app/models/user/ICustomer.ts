export interface ICustomer {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  shippingAddress?: IAddress;
  billingAddress?: IAddress;
}

export interface IAddress {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}
