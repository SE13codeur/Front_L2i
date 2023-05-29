import { Injectable } from '@angular/core';
import { ICartItem, IItem } from '@models/index';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateItemQuantityInStock } from '@store/item';
import { ItemState, ItemStateModel } from '@store/item/item.state';
import { AddToCart, ClearCart, RemoveFromCart } from './cart.action';

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
  static getItemQuantity(
    getItemQuantity: any
  ): (
    target: import('../../components').CartComponent,
    propertyKey: 'itemQuantity$'
  ) => void {
    throw new Error('Method not implemented.');
  }
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

  @Selector([ItemState])
  static getCartItemInStock(
    state: CartStateModel,
    itemState: ItemStateModel
  ): (id: number) => ICartItem | undefined {
    return (id: number) => {
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem) {
        const item = itemState.items.find((item) => item.id === id);
        return {
          ...cartItem,
          quantityInStock: item ? item.quantityInStock : 0,
        };
      } else {
        return undefined;
      }
    };
  }

  @Selector([ItemState])
  static getDetailedCartItems(
    state: CartStateModel,
    itemState: ItemStateModel
  ): IItem[] {
    return state.cartItems.map((cartItem) => {
      const item = itemState.items.find((item) => item.id === cartItem.id);
      return {
        id: cartItem.id,
        isbn13: cartItem.isbn13 || '',
        imageUrl: item?.imageUrl || '',
        title: cartItem.title,
        subtitle: item?.subtitle || '',
        description: cartItem.description,
        regularPrice: item?.regularPrice || 0,
        rating: item?.rating || 0,
        quantityInStock: item?.quantityInStock || 0,
        totalSales: item?.totalSales || 0,
        authors: item?.authors || [],
        editor: item?.editor || { id: 0, name: '', slug: '' },
        category: item?.category || { id: 0, name: '', slug: '' },
        pages: item?.pages || '',
        year: item?.year || '',
        language: item?.language || '',
        version: item?.version || 0,
        newCollection: item?.newCollection || false,
        image: cartItem.image,
        price: cartItem.price,
        quantity: cartItem.quantity,
      };
    });
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

  @Action(UpdateItemQuantityInStock)
  updateItemStock(
    { getState, patchState }: StateContext<CartStateModel>,
    { itemId, selectedQuantity }: UpdateItemQuantityInStock
  ) {
    const state = getState();
    const cartItemIndex = state.cartItems.findIndex(
      (item) => item.id === itemId
    );

    if (cartItemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const cartItem = state.cartItems[cartItemIndex];

    // If quantity is more than available in stock, throw an error
    if (selectedQuantity > cartItem.quantity) {
      throw new Error('Quantity in cart exceeds available stock');
    }

    // If quantity is less than zero, throw an error
    if (selectedQuantity < 0) {
      throw new Error('Selected quantity cannot be less than zero');
    }

    const updatedCartItem = {
      ...cartItem,
      quantity: selectedQuantity,
    };

    const updatedCartItems = [...state.cartItems];
    updatedCartItems[cartItemIndex] = updatedCartItem;

    patchState({
      cartItems: updatedCartItems,
    });
  }

  @Action(ClearCart)
  clear({ patchState }: StateContext<CartStateModel>) {
    patchState({
      cartItems: [],
    });
  }
}
