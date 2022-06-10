import { Product } from '../../../globals/interfaces/product';
import { CheckoutAPI, DeliveryDates } from '../../../globals/interfaces/checkout';

export type ShippingValueState = null | number;

export interface ActiveCreditCard {
  lastNumber: string;
  brand: string;
  expiry: Date;
};

export type ActiveCreditCardState = ActiveCreditCard | null;

export type OnceItemsState = Array<Product>;
export type WeeklyItemsState = Array<Product>;
export type BiweeklyItemsState = Array<Product>;
export type MonthlyItemsState = Array<Product>;

export type CheckoutState = null | CheckoutAPI;

export interface PricesState {
  once: number;
  weekly: number;
  biweekly: number;
  monthly: number;
};

export type DeliveryDatesState = null | DeliveryDates;

export type IsActiveState = boolean;