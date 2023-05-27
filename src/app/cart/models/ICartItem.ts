import { BehaviorSubject } from 'rxjs';

export interface ICartItem {
  id: number;
  isbn13: string;
  title: string;
  price: number;
  quantity$: BehaviorSubject<number>;
  description: string;
  image: string;
}
