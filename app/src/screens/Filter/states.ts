import React from 'react';

import {
  SelectedProductState,
  ProductsState,
} from './types';

export interface IUseStates {
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;

  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;
};

export default function useStates(): IUseStates {
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  const [products, setProducts] = React.useState<ProductsState>([]);

  return {
    selectedProduct,
    setSelectedProduct,

    products,
    setProducts,
  };
};