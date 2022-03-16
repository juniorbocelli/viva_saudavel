import React from 'react';

import useStates from './states';
import useAPIs from './api/apis';
import { IGlobalContext } from './types';

const GlobalContext = React.createContext({} as IGlobalContext);

interface IProps {
  children?: React.ReactNode;
};

export const GlobalContextProvider: React.FC<IProps> = ({ children }) => {
  const states = useStates();
  const apis = useAPIs(states);

  return (
    <GlobalContext.Provider
      value={
        {
          products: states.products,
          fetchProducts: apis.getProducts,
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
