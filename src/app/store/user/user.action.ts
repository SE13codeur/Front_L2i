import { IItem, IUser } from '@models/index';

export class InitUser {
  static readonly type = '[User] Init';
  constructor(public payload: IUser) {}
}

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public payload: IUser) {}
}
export class AddToFavoriteItems {
  static readonly type = '[User] Add To Favorite Items';
  constructor(public payload: IItem) {}
}

export class RemoveFromFavoriteItems {
  static readonly type = '[User] Remove From Favorite Items';
  constructor(public payload: IItem) {}
}
