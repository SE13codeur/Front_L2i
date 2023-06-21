import { ICustomer } from '@models/index';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public payload: ICustomer) {}
}

export class GetOrdersByUserId {
  static readonly type = '[Order] Get orders by user id';
  constructor(public userId: number) {}
}

export class ClearUser {
  static readonly type = '[User] Clear';
}
