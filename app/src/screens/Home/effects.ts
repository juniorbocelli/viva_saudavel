import React from 'react';

import { IUseAPIs } from './apis';

export interface IUseEffects {
  useComponentDidMount: () => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = () => {
    React.useEffect(() => {
      apis.getProducts();
    }, []);
  };

  return {
    useComponentDidMount,
  };
};