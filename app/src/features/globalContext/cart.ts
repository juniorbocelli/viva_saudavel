import { IUseStates, IUseCart } from './types';
import { CartItem, CartItemContainer } from '../../globals/interfaces/cart';

export default function useCart(states: IUseStates): IUseCart {
  const getTotalItems = (items: Array<CartItemContainer>): number => {
    let total: number = 0;

    items.forEach((item) => {
      total = total + item.quantity;
    });

    return total;
  };

  const getTotalCartPrice = (items: Array<CartItem>): number => {
    let total: number = 0;

    items.forEach((item) => {
      total = total + item.price;
    });

    return total;
  };

  return {
    getTotalItems,
    getTotalCartPrice,
  };
};