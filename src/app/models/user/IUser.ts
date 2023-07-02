import { IItem } from '..';
import { IAddress } from './IAddress';
import { Role } from './Role';

export interface IUser {
  id: number;
  role: { id: number; title: Role };
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  addresses?: IAddress[];
  favoriteItems?: IItem[];
}
