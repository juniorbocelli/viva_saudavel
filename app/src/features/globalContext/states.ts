import React from 'react';

import {
  IUseStates,

  Cart,
} from './types';

export default function IUseSates(): IUseStates {
  const [cart, setCart] = React.useState<Cart>([])

  return {
    cart,
    setCart,
  };
};