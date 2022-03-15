import React from 'react';

import {
  IUseStates,
  Products,
} from './types';

export default function IUseSates(): IUseStates {
  const [products, setProducts] = React.useState<Products>([]);

  return {
    products,
    setProducts,
  };
};