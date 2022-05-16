import { CreditCard } from '../../../globals/interfaces/creditCard';

export type SelectedCardState = string | undefined;

export interface CreditCardFormData {
  number: string;
  name: string;
  expiry: string;
  brand: string;
  cvc: string;
};

export type CardsState = Array<CreditCard>;

export interface CardValuesEstate {
  number: string;
  name: string;
  expiry: string;
  cvc: string;

  issuer: string;
  isValid: boolean;

  focused: null | string;
};