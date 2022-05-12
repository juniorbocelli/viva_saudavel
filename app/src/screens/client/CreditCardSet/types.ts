import { CreditCard } from '../../../globals/interfaces/creditCard';

export type SelectedCardState = string | undefined;

export interface CreditCardFormData {
  number: string;
  name: string;
  expiryDate: string;
  brand: string;
  cvv: string;
};

export type CardsState = Array<CreditCard>;