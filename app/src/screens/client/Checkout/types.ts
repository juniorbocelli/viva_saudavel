export interface CheckoutFormData {
  deliveryDay: string;
};

export type DeliveryDayState = null | Date;
export type ShippingValueState = null | number;

export type HasActiveCardState = boolean;