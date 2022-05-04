import axios from '../../globals/axios';
import * as Routes from '../../globals/routes';
import { CartItem } from '../../globals/interfaces/cart';

export function getCartAPI(id: string) {
  return axios.get(Routes.API_CART_GET.replace(':id', id));
};

export function addItemAPI(id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) {
  return axios.patch(Routes.API_CART_ADD_ITEM.replace(':id', id),
  {
    productId: productId,
    frequency: frequency,
  });
};