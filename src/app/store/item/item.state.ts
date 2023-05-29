import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  LoadItems,
  LoadItem,
  UpdateItem,
  UpdateItemQuantityInStock,
} from './item.action';
import { IItem } from '@models/index';
import { ItemService } from '@services/index';
import { Injectable } from '@angular/core';

export interface ItemStateModel {
  items: IItem[];
}

@State<ItemStateModel>({
  name: 'item',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ItemState {
  constructor(private itemService: ItemService) {}

  @Selector()
  static getItem(state: ItemStateModel): (id: number) => IItem | undefined {
    return (id: number) => state.items.find((item) => item.id === id);
  }

  @Action(LoadItems)
  loadItems({ patchState }: StateContext<ItemStateModel>) {
    return this.itemService.getItems().subscribe((items) => {
      patchState({
        items: items,
      });
    });
  }

  @Action(LoadItem)
  loadItem(
    { patchState, getState }: StateContext<ItemStateModel>,
    { itemId }: LoadItem
  ) {
    return this.itemService.getItemById(itemId).subscribe((item) => {
      const state = getState();
      patchState({
        items: [...state.items, item],
      });
    });
  }

  @Action(UpdateItem)
  updateItem(
    { getState, patchState }: StateContext<ItemStateModel>,
    { item }: UpdateItem
  ) {
    const state = getState();
    const itemIndex = state.items.findIndex((i) => i.id === item.id);
    if (itemIndex === -1) {
      throw new Error('Item not found in store');
    }
    const updatedItems = [...state.items];
    updatedItems[itemIndex] = item;
    patchState({
      items: updatedItems,
    });
  }

  @Action(UpdateItemQuantityInStock)
  updateItemStock(
    { getState, patchState }: StateContext<ItemStateModel>,
    { itemId, selectedQuantity }: UpdateItemQuantityInStock
  ) {
    const state = getState();
    const itemIndex = state.items.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found in store');
    }
    const currentItem = state.items[itemIndex];
    if (currentItem.quantityInStock - selectedQuantity < 0) {
      throw new Error('Insufficient stock');
    }
    const updatedItem = {
      ...currentItem,
      quantityInStock: currentItem.quantityInStock - selectedQuantity,
    };
    const updatedItems = [...state.items];
    updatedItems[itemIndex] = updatedItem;
    patchState({
      items: updatedItems,
    });
  }
}
