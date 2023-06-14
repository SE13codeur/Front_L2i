export interface ICustomerInfos {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: IBillingAddress;
}

export interface IBillingAddress {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}
