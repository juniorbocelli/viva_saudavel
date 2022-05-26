export interface CheckoutFormData {
  deliveryDay: string;
};

export type DeliveryDayState = null | Date;
export type ShippingValueState = null | number;

export interface ActiveCreditCard {
  lastNumber: string;
  brand: string;
  expiry: Date;
};

export type ActiveCreditCardState = ActiveCreditCard | null;