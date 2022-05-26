import { Product } from './product';

export interface CartItem {
  productId: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';

  name: string;
  price: number;
  thumb: string;
};

export interface CartItemContainer extends CartItem {
  quantity: number;
};

export interface CartItemAPI {
  product: Product | string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
};