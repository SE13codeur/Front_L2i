export interface IAddress {
  id: number;
  title?: string;
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  userId: number | undefined;
}
