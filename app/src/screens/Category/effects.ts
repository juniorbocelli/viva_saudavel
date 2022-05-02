import React from 'react';

import { IUseAPIs } from './apis';
import { FilterSearch } from '../../globals/interfaces/product';

export interface IUseEffects {
  useComponentDidMount: (filter: FilterSearch) => void;
};

export default function useEffects(apis: IUseAPIs): IUseEffects {
  const useComponentDidMount = (filter: FilterSearch) => {
    React.useEffect(() => {
      if (typeof (filter) !== 'undefined')
        apis.getProductsByFilters(filter);
    }, []);
  };

  return {
    useComponentDidMount,
  };
};