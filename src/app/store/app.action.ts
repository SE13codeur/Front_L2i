export class LogOut {
  public static type = '[app] log out';
}

export class SetDrawerCartIsVisible {
  public static type = '[app] set drawer cart is visible';
  constructor(public _value: boolean) {}
}
