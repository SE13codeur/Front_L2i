import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ICartItem, IItem } from '@models/index';
import {
  AddToCart,
  RemoveFromCart,
  UpdateCartItemQuantity,
  ClearCart,
  IncreaseCartItemQuantity,
  DecreaseCartItemQuantity,
} from './cart.action';

export interface CartStateModel {
  cartItems: ICartItem[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cartItems: [],
  },
})
@Injectable()
export class CartState {
  constructor() {}

  @Selector()
  static getCartItems(state: CartStateModel) {
    return state.cartItems;
  }

  @Selector()
  static getCartItemQuantity(state: CartStateModel): (id: number) => number {
    return (id: number) => {
      const cartItem = state.cartItems.find((cartItem) => cartItem.id === id);
      return cartItem ? cartItem.quantity : 0;
    };
  }

  @Selector()
  static getSubTotal(state: CartStateModel) {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  @Selector()
  static getTotalWithTaxes(state: CartStateModel) {
    const subTotal = CartState.getSubTotal(state);
    return subTotal + subTotal * 0.2; // 20% of taxes :(
  }

  @Selector()
  static getTotalItems(state: CartStateModel) {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  @Action(AddToCart)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { item }: AddToCart
  ) {
    const state = getState();
    patchState({
      cartItems: [...state.cartItems, item],
    });
  }

  @Action(RemoveFromCart)
  remove(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId }: RemoveFromCart
  ) {
    patchState({
      cartItems: getState().cartItems.filter((a) => a.id != itemId),
    });
  }

  @Action(IncreaseCartItemQuantity)
  increaseItemQuantity(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId, selectedQuantity }: IncreaseCartItemQuantity
  ) {
    const state = getState();
    const cartItemIndex = state.cartItems.findIndex(
      (item) => item.id === itemId
    );
    if (cartItemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const cartItem = state.cartItems[cartItemIndex];

    // Récupérer le state de l'Item
    const itemState = this.store.selectSnapshot(ItemState);

    // Récupérer l'item correspondant à partir du state de l'Item
    const item = itemState.items.find((item) => item.id === cartItem.id);

    if (!item) {
      throw new Error('Item not found in items');
    }

    if (cartItem.quantity + selectedQuantity > item.quantityInStock) {
      throw new Error('Quantity exceeds available stock');
    }

    const updatedCartItem = {
      ...cartItem,
      quantity: cartItem.quantity + selectedQuantity,
    };
    const updatedCartItems = [...state.cartItems];
    updatedCartItems[cartItemIndex] = updatedCartItem;

    patchState({
      cartItems: updatedCartItems,
    });
  }

  @Action(DecreaseCartItemQuantity)
  decreaseItemQuantity(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId, selectedQuantity }: DecreaseCartItemQuantity
  ) {
    const state = getState();
    const cartItemIndex = state.cartItems.findIndex(
      (item) => item.id === itemId
    );
    if (cartItemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const cartItem = state.cartItems[cartItemIndex];
    if (cartItem.quantity - selectedQuantity < 0) {
      throw new Error('Quantity cannot be less than zero');
    }

    const updatedCartItem = {
      ...cartItem,
      quantity: cartItem.quantity - selectedQuantity,
    };
    const updatedCartItems = [...state.cartItems];
    updatedCartItems[cartItemIndex] = updatedCartItem;

    patchState({
      cartItems: updatedCartItems,
    });
  }

  @Action(UpdateCartItemQuantity)
  updateItemQuantity(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId, quantity }: UpdateCartItemQuantity
  ) {
    const state = getState();
    const item = state.cartItems[itemId];

    if (!item) {
      throw new Error('Item not found in cart');
    }

    // If quantity is more than available in stock, throw an error
    if (quantity > item.quantity) {
      throw new Error('Quantity exceeds available stock');
    }

    // If quantity is less than zero, throw an error
    if (quantity < 0) {
      throw new Error('Quantity cannot be less than zero');
    }

    const updatedItem = { ...item, quantity };

    patchState({
      cartItems: {
        ...state.cartItems,
        [itemId]: updatedItem,
      },
    });
  }

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({
      cartItems: [],
    });
  }
}
