import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import {
  ProductsState,
  FilterSearchState,
} from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;

  filterSearch: FilterSearchState;
  setFilterSearch: React.Dispatch<React.SetStateAction<FilterSearchState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [products, setProducts] = React.useState<ProductsState>([]);
  const [filterSearch, setFilterSearch] = React.useState<FilterSearchState>(null);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    products,
    setProducts,

    filterSearch,
    setFilterSearch,
  };
};