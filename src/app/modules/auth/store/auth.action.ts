import { Role } from '@models/index';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public payload: { username: string; role: string; email: string }
  ) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(
    public payload: { username: string; role: string; email: string }
  ) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Failed';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SetOpenCartAfterLogin {
  static readonly type = '[Auth] Set Open Cart After Login';
  constructor(public payload: boolean) {}
}

export class ResetOpenCartAfterLogin {
  static readonly type = '[Auth] Reset Open Cart After Login';
}
export class SetOpenAccountDrawerAfterLogin {
  static readonly type = '[Auth] Set Open Account After Login';
  constructor(public payload: boolean) {}
}

export class ResetOpenAccountDrawerAfterLogin {
  static readonly type = '[Auth] Reset Open Account After Login';
}
