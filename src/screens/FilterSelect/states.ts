import React from 'react';

import {
  SelectedProductState,
  ProductsState,
  SelectedFilterState,
} from './types';

export interface IUseStates {
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;

  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;

  selectedFilter: SelectedFilterState;
  setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilterState>>;
};

export default function useStates(): IUseStates {
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  const [products, setProducts] = React.useState<ProductsState>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<SelectedFilterState>('');

  return {
    selectedProduct,
    setSelectedProduct,

    products,
    setProducts,

    selectedFilter,
    setSelectedFilter,
  };
};