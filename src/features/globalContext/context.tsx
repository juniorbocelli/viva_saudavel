import React from 'react';

import useStates from './states';
import useAPIs from './api/apis';
import useCart from './cart';
import { IGlobalContext } from './types';

const GlobalContext = React.createContext({} as IGlobalContext);

interface IProps {
  children?: React.ReactNode;
};

export const GlobalContextProvider: React.FC<IProps> = ({ children }) => {
  const states = useStates();
  const apis = useAPIs(states);
  const cart = useCart(states);

  return (
    <GlobalContext.Provider
      value={
        {
          products: states.products,
          fetchProducts: apis.getProducts,

          cart: states.cart,
          addItem: cart.addProduct,
          getCartLenght: cart.getCartLenght,
          getCartValue: cart.getCartValue,
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
