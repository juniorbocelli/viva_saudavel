import React from 'react';

import { IUseAPIs } from './apis';
import { SelectedFilterState } from './types';

export interface IUseEffects {
  useFilterDidChanged: (filter: SelectedFilterState) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useFilterDidChanged = (filter: SelectedFilterState) => {
    React.useEffect(() => {
      if (filter !== '')
        apis.getProductsByFilters();
    }, [filter]);
  };

  return {
    useFilterDidChanged,
  };
};