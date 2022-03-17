import React from 'react';

import {
  SelectedProductState,
} from './types';

export interface IUseStates {
  selectedProduct: SelectedProductState;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SelectedProductState>>;
};

export default function useStates(): IUseStates {
  const [selectedProduct, setSelectedProduct] = React.useState<SelectedProductState>(null);

  return {
    selectedProduct,
    setSelectedProduct,
  };
};