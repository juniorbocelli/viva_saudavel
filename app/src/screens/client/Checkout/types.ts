import { CartItem } from '../../../globals/interfaces/cart';

export interface CheckoutFormData {
  deliveryDay: string;

  items: Array<CartItem>;
};

export type DeliveryDayState = null | Date;
export type ShippingValueState = null | number;

export interface ActiveCreditCard {
  lastNumber: string;
  brand: string;
  expiry: Date;
};

export type ActiveCreditCardState = ActiveCreditCard | null;