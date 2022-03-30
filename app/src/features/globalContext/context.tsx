import React from 'react';

import useStates from './states';
import useCart from './cart';
import { IGlobalContext } from './types';

const GlobalContext = React.createContext({} as IGlobalContext);

interface IProps {
  children?: React.ReactNode;
};

export const GlobalContextProvider: React.FC<IProps> = ({ children }) => {
  const states = useStates();
  const cart = useCart(states);

  return (
    <GlobalContext.Provider
      value={
        {
          cart: states.cart,
          addItem: cart.addProduct,
          getCartLenght: cart.getCartLenght,
          getCartValue: cart.getCartValue,
          getQuantityFromItem: cart.getQuantityFromItem,
          addItemByKey: cart.addItemByKey,
          removeItemByKey: cart.removeItemByKey,
          getProductsByFrequency: cart.getProductsByFrequency,
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
