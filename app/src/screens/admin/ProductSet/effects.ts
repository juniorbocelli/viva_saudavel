import React from 'react';

import { IUseAPIs } from './apis';
import { IUseStates } from './states';

export interface IUseEffects {
  useComponentDidMount: (id: string | undefined, setProductId: IUseStates['setProductId']) => void;
  useProductIdDidChanged: (id: IUseStates['productId'], resetForm: () => void) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = (id: string | undefined, setProductId: IUseStates['setProductId']) => {
    React.useEffect(() => {
      setProductId(id);
    }, [id, setProductId]);
  };

  const useProductIdDidChanged = (id: IUseStates['productId'], resetForm: () => void) => {
    React.useEffect(() => {
      resetForm();

      if (typeof (id) !== 'undefined')
        apis.getProduct();
    }, [id]);
  };

  return {
    useComponentDidMount,
    useProductIdDidChanged,
  };
};