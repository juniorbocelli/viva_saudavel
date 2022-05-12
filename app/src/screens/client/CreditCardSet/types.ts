import { CreditCard } from '../../../globals/interfaces/creditCard';

export type CreditCardIdState = string | undefined;

export interface CreditCardFormData {
  number: string;
  name: string;
  expiryDate: string;
  brand: string;
  cvv: string;
};

export type CardsState = Array<CreditCard>;