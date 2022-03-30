import React from 'react';

import {
  SelectedProductState,
  ProductsState,
  SelectedProducerState,
} from './types';

export interface IUseStates {
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;

  products: ProductsState;
  setProducts: React.Dispatch<React.SetStateAction<ProductsState>>;

  selectedProducer: SelectedProducerState;
  setSelectedProducer: React.Dispatch<React.SetStateAction<SelectedProducerState>>;
};

export default function useStates(): IUseStates {
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);
  const [products, setProducts] = React.useState<ProductsState>([]);
  const [selectedProducer, setSelectedProducer] = React.useState<SelectedProducerState>('');

  return {
    selectedProduct,
    setSelectedProduct,

    products,
    setProducts,

    selectedProducer,
    setSelectedProducer,
  };
};