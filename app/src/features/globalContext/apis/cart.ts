import { getCartAPI, addItemAPI, removeItemAPI } from '../../../services/cart';

import { IUseStates, IUseCartAPIs, CartItemFromAPI } from '../types';
import { CartItem, CartItemContainer } from '../../../globals/interfaces/cart';

export default function useCartAPIs(states: IUseStates): IUseCartAPIs {
  const repeatedVerify = (items: Array<CartItemContainer>, productId: string): number | null => {
    for (let i = 0; i < items.length; i++)
      if (items[i].productId === productId)
        return i;

    return null;
  };

  const syncCart = (cartItems: Array<CartItemFromAPI>) => {
    let allItems: Array<CartItem>= [];
    let onceItems: Array<CartItemContainer> = [];
    let weeklyItems: Array<CartItemContainer> = [];
    let biweeklyItems: Array<CartItemContainer> = [];
    let monthlyItems: Array<CartItemContainer> = [];

    // Reset all cart states
    states.setOnceItems([]);
    states.setWeeklyItems([]);
    states.setBiweeklyItems([]);
    states.setMonthlyItems([]);

    cartItems.forEach(receivedItem => {
      let repeated: null | number;

      let item: CartItem = {
        frequency: receivedItem.frequency,
        productId: receivedItem.product.id!,
        name: receivedItem.product.name,
        price: receivedItem.product.price,
        thumb: receivedItem.product.thumb!,
      };

      allItems.push(item);

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

    states.setCart(allItems);
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

        const cartItems: Array<CartItemFromAPI> = response.data.cart.items;
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

        const receivedItem: CartItemFromAPI = response.data.cartItem;
        const cartItem: CartItem = {
          frequency: receivedItem.frequency,
          productId: receivedItem.product.id!,
          name: receivedItem.product.name,
          price: receivedItem.product.price,
          thumb: receivedItem.product.thumb!,
        };

        states.setCart(cart => [...cart, cartItem]);

        let array: Array<CartItemContainer> = [];

        switch (frequency) {
          case 'once':
            array = states.onceItems.slice();
            for (let i = 0; i < array.length; i++) {
              if (productId === array[i].productId) {
                array[i].quantity++;
                states.setOnceItems(array);

                return;
              };
            };

            states.setOnceItems(i => [...i, { ...cartItem, quantity: 1 }]);

            break;

          case 'weekly':
            array = states.weeklyItems.slice();
            for (let i = 0; i < array.length; i++) {
              if (productId === array[i].productId) {
                array[i].quantity++;
                states.setWeeklyItems(array);

                return;
              };
            };

            states.setWeeklyItems(i => [...i, { ...cartItem, quantity: 1 }]);

            break;

          case 'biweekly':
            array = states.biweeklyItems.slice();
            for (let i = 0; i < array.length; i++) {
              if (productId === array[i].productId) {
                array[i].quantity++;
                states.setBiweeklyItems(array);

                return;
              };
            };

            states.setBiweeklyItems(i => [...i, { ...cartItem, quantity: 1 }]);

            break;

          case 'monthly':
            array = states.monthlyItems.slice();
            for (let i = 0; i < array.length; i++) {
              if (productId === array[i].productId) {
                array[i].quantity++;
                states.setMonthlyItems(array);

                return;
              };
            };

            states.setMonthlyItems(i => [...i, { ...cartItem, quantity: 1 }]);

            break;
        };
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

        const cartItem: { productId: CartItem['productId'], frequency: CartItem['frequency'] } = {productId: response.data.cartItem.product, frequency: response.data.cartItem.frequency};

        for (let i = 0; i < states.cart.length; i++) {
          if (cartItem.productId === states.cart[i].productId && cartItem.frequency === states.cart[i].frequency) {
            states.setCart(items => { items.splice(i, 1); return items; });

            break;
          };
        };

        switch (cartItem.frequency) {
          case 'once':
            for (let i = 0; i < states.onceItems.length; i++)
              if (cartItem.productId === states.onceItems[i].productId && cartItem.frequency === states.onceItems[i].frequency) {
                if (states.onceItems[i].quantity === 1)
                  states.setOnceItems(items => { items.splice(i, 1); return items; });
                else
                  states.setOnceItems(items => { items[i].quantity--; return items; });

                break;
              };

            break;

          case 'weekly':
            for (let i = 0; i < states.weeklyItems.length; i++)
              if (cartItem.productId === states.weeklyItems[i].productId && cartItem.frequency === states.weeklyItems[i].frequency) {
                if (states.weeklyItems[i].quantity === 1)
                  states.setWeeklyItems(items => { items.splice(i, 1); return items; });
                else
                  states.setWeeklyItems(items => { items[i].quantity--; return items; });

                break;
              };

            break;

          case 'biweekly':
            for (let i = 0; i < states.biweeklyItems.length; i++)
              if (cartItem.productId === states.biweeklyItems[i].productId && cartItem.frequency === states.biweeklyItems[i].frequency) {
                if (states.biweeklyItems[i].quantity === 1)
                  states.setBiweeklyItems(items => { items.splice(i, 1); return items; });
                else
                  states.setBiweeklyItems(items => { items[i].quantity--; return items; });

                break;
              };

            break;

          case 'monthly':
            for (let i = 0; i < states.monthlyItems.length; i++)
              if (cartItem.productId === states.monthlyItems[i].productId && cartItem.frequency === states.monthlyItems[i].frequency) {
                if (states.monthlyItems[i].quantity === 1)
                  states.setMonthlyItems(items => { items.splice(i, 1); return items; });
                else
                  states.setMonthlyItems(items => { items[i].quantity--; return items; });

                break;
              };

            break;
        };

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