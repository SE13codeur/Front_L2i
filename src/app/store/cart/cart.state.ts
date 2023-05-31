import { Injectable } from '@angular/core';
import { ICartItem } from '@models/index';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { ItemService } from '@services/index';
import {
  AddToCart,
  ClearCart,
  RemoveFromCart,
  UpdateCartItemQuantity,
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
  constructor(private itemService: ItemService) {}

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
      (total, item) => total + item.regularPrice * item.quantity,
      0
    );
  }

  @Selector()
  static getTotalWithTaxes(state: CartStateModel) {
    const subTotal = CartState.getSubTotal(state);
    return subTotal + subTotal * 0.2; // 20% of taxes :(
  }

  @Selector()
  static getCartTotalItems(state: CartStateModel) {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  @Action(AddToCart)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { item }: AddToCart
  ) {
    const state = getState();
    const cartItems = [...state.cartItems];
    const itemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex > -1) {
      // Item already exists in the cart, increment the quantity.
      cartItems[itemIndex] = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + item.quantity,
      };
    }
    // Item does not exist in the cart, add it.
    if (itemIndex <= -1) {
      cartItems.push(item);
    }

    patchState({
      cartItems,
    });
  }

  @Action(UpdateCartItemQuantity)
  updateCartItemQuantity(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId, selectedQuantity }: UpdateCartItemQuantity
  ) {
    const state = getState();
    const cartItems = [...state.cartItems];
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      // Item already exists in the cart, update the quantity.
      cartItems[itemIndex] = {
        ...cartItems[itemIndex],
        quantity: selectedQuantity,
      };
    } else {
      // Item does not exist in the cart, add it.
      this.itemService.getItemById(itemId).subscribe((item) => {
        const newItem: ICartItem = {
          id: item.id,
          isbn13: item.isbn13,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          regularPrice: item.regularPrice,
          quantity: selectedQuantity,
          subtitle: item.subtitle,
          quantityInStock: item.quantityInStock,
          totalSales: item.totalSales,
          authors: item.authors,
          editor: item.editor,
          category: item.category,
          pages: item.pages,
          year: item.year,
          version: item.version,
        };
        cartItems.push(newItem);
      });
    }

    patchState({
      cartItems,
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

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({
      cartItems: [],
    });
  }
}
