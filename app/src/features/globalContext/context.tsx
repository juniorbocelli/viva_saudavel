import React from 'react';

import { IGlobalContext } from './types';
import useStates from './states';
import useCartAPIs from './apis/cart';
import useCart from './cart';

const GlobalContext = React.createContext({} as IGlobalContext);

interface IProps {
  children?: React.ReactNode;
};

export const GlobalContextProvider: React.FC<IProps> = ({ children }) => {
  const states = useStates();
  const cartAPIs = useCartAPIs(states);
  const cart = useCart(states);

  return (
    <GlobalContext.Provider
      value={
        {
          cart: {
            cart: states.cart,

            onceItems: states.onceItems,
            weeklyItems: states.weeklyItems,
            biweeklyItems: states.biweeklyItems,
            monthlyItems: states.monthlyItems,

            getCart: cartAPIs.getCart,
            addItem: cartAPIs.addItem,
            removeItem: cartAPIs.removeItem,

            getTotalItems: cart.getTotalItems,
            getTotalCartPrice: cart.getTotalCartPrice,
          }
        }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = React.useContext(GlobalContext);
  return context;
};
