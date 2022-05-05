import { getCartAPI, addItemAPI, removeItemAPI } from '../../../services/cart';

import { IUseStates, IUseCartAPIs } from '../types';
import { CartItem, CartItemContainer } from '../../../globals/interfaces/cart';

export default function useCartAPIs(states: IUseStates): IUseCartAPIs {
  const repeatedVerify = (items: Array<CartItemContainer>, productId: string): number | null => {
    for (let i = 0; i < items.length; i++)
      if (items[i].productId === productId)
        return i;

    return null;
  };

  const syncCart = (cartItems: Array<CartItem>) => {
    states.setCart(cartItems);

    let onceItems: Array<CartItemContainer> = [];
    let weeklyItems: Array<CartItemContainer> = [];
    let biweeklyItems: Array<CartItemContainer> = [];
    let monthlyItems: Array<CartItemContainer> = [];

    cartItems.forEach(item => {
      let repeated: null | number;

      switch (item.frequency) {
        case 'once':
          onceItems = onceItems.slice();
          repeated = repeatedVerify(onceItems, item.productId);

          if (repeated === null)
            onceItems.push({
              productId: item.productId,
              name: item.name,
              frequency: item.frequency,
              price: item.price,
              thumb: item.thumb,
              quantity: 1,
            });
          else
            ++onceItems[repeated].quantity;

          states.setOnceItems(onceItems);
          break;

        case 'weekly':
          weeklyItems = weeklyItems.slice();
          repeated = repeatedVerify(weeklyItems, item.productId);

          if (repeated === null)
            weeklyItems.push({
              productId: item.productId,
              name: item.name,
              frequency: item.frequency,
              price: item.price,
              thumb: item.thumb,
              quantity: 1,
            });
          else
            ++weeklyItems[repeated].quantity;

          states.setWeeklyItems(weeklyItems);
          break;

        case 'biweekly':
          biweeklyItems = biweeklyItems.slice();
          repeated = repeatedVerify(biweeklyItems, item.productId);

          if (repeated === null)
            biweeklyItems.push({
              productId: item.productId,
              name: item.name,
              frequency: item.frequency,
              price: item.price,
              thumb: item.thumb,
              quantity: 1,
            });
          else
            ++biweeklyItems[repeated].quantity;

          states.setBiweeklyItems(biweeklyItems);
          break;

        case 'monthly':
          monthlyItems = monthlyItems.slice();
          repeated = repeatedVerify(monthlyItems, item.productId);

          if (repeated === null)
            monthlyItems.push({
              productId: item.productId,
              name: item.name,
              frequency: item.frequency,
              price: item.price,
              thumb: item.thumb,
              quantity: 1,
            });
          else
            ++monthlyItems[repeated].quantity;

          states.setMonthlyItems(monthlyItems);
          break;
      };
    });
  };

  const getCart = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getCartAPI(clientId)
      .then((response) => {
        console.log('response => getCart', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const cartItems: Array<CartItem> = response.data.cart.items;
        syncCart(cartItems);
      })
      .catch((error) => {
        console.error('error => getCart', error as string);
        states.setDialogMessage({ title: "Erro", message: error as string });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const addItem = (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => {
    states.setIsQueryingAPI(true);

    addItemAPI(id, productId, frequency)
      .then((response) => {
        console.log('response => addItemAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const cartItems: Array<CartItem> = response.data.cart.items;
        syncCart(cartItems);
      })
      .catch((error) => {
        console.error('error => addItemAPI', error);
        states.setDialogMessage({ title: "Erro", message: error as string });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const removeItem = (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => {
    states.setIsQueryingAPI(true);

    removeItemAPI(id, productId, frequency)
      .then((response) => {
        console.log('response => removeItemAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const cartItems: Array<CartItem> = response.data.cart.items;
        syncCart(cartItems);
      })
      .catch((error) => {
        console.error('error => removeItemAPI', error);
        states.setDialogMessage({ title: "Erro", message: error as string });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getCart,
    addItem,
    removeItem,
  };
};