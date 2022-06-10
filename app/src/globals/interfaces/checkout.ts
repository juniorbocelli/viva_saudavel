import { CartItem, CartItemAPI } from './cart';
import { Client } from './client';
import { WeekDaysName } from './dateTime';

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

export interface DeliveryDates {
  once: Date | null;
  weekly: Date | null;
  biweekly: Date | null;
  monthly: Date | null;
};