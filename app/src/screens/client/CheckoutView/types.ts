import { Product } from '../../../globals/interfaces/product';

export type DeliveryDayState = null | Date;
export type ShippingValueState = null | number;

export interface ActiveCreditCard {
  lastNumber: string;
  brand: string;
  expiry: Date;
};

export type ActiveCreditCardState = ActiveCreditCard | null;

export type AllItemsState = Array<Product>;
export type OnceItemsState = Array<Product>;
export type WeeklyItemsState = Array<Product>;
export type BiweeklyItemsState = Array<Product>;
export type MonthlyItemsState = Array<Product>;

export type ProductsPriceState = number;