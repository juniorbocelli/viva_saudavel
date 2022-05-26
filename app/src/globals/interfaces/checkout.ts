import { CartItem, CartItemAPI } from './cart';
import { Client } from './client';

export type WeekDaysName = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface Checkout {
  id?: string;

  client?: Client | string;
  items: Array<CartItem>;

  deliveryDay: WeekDaysName;

  createdAt?: Date;
  isActive?: Boolean;
};

export interface CheckoutAPI {
  id?: string;

  client?: Client | string;
  items: Array<CartItemAPI>;

  deliveryDay: WeekDaysName;

  createdAt?: Date;
  isActive?: Boolean;
};