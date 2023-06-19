import { ICustomer } from '@models/index';

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public payload: ICustomer) {}
}

export class ClearUser {
  static readonly type = '[User] Clear';
}
