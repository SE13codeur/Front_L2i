import { State, Action, StateContext } from '@ngxs/store';

// Action à déclencher
export class AddItem {
  static readonly type = '[CART] Add Item';
  constructor(public payload: any) {}
}

// État de Cart
@State<any>({
  name: 'cart',
  defaults: [],
})
export class CartState {
  @Action(AddItem)
  addItem(ctx: StateContext<any>, action: AddItem) {
    const state = ctx.getState();
    ctx.setState([...state, action.payload]);
  }
}
