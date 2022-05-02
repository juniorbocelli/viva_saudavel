import React from 'react';

import { IUseAPIs } from './apis';
import { SelectedProducerState } from './types';

export interface IUseEffects {
  useFilterDidChanged: (producer: SelectedProducerState) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useFilterDidChanged = (producer: SelectedProducerState) => {
    React.useEffect(() => {
      if (producer !== '')
        apis.getProductsByFilters();
    }, [producer]);
  };

  return {
    useFilterDidChanged,
  };
};