import React from 'react';

import {
  IUseStates,
  Products,

  Cart,
} from './types';

export default function IUseSates(): IUseStates {
  const [products, setProducts] = React.useState<Products>([]);
  const [cart, setCart] = React.useState<Cart>([])

  return {
    products,
    setProducts,

    cart,
    setCart,
  };
};