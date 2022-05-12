export interface CreditCard {
  id?: string;
  clientId?: string;

  brand: string;
  name: string | null;
  number: Array<string>;
  expiryDate: Date;
  cvv: string;

  createdAt?: Date;
  isActive?: boolean;
};