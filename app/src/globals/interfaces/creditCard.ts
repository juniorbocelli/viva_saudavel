export interface CreditCard {
  id?: string;
  clientId?: string;

  brand: string;
  name: string | null;
  number: Array<string>;
  expiry: Date;
  cvc: string;

  createdAt?: Date;
  isActive?: boolean;
};