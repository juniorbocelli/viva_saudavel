import { IUseStates } from './states';
import { CreditCard } from '../../../globals/interfaces/creditCard';

import {
  newCreditCardAPI,
  updateCreditCardAPI,
} from '../../../services/creditCard';

export interface IUseAPIs {
  newCreditCard: (clientid: string, creditCard: CreditCard) => void;
  updateCreditCard: (clientId: string, credictCard: CreditCard) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const newCreditCard = (clientId: string, creditCard: CreditCard) => {
    states.setIsQueryingAPI(true);

    newCreditCardAPI(clientId, creditCard)
      .then((response) => {
        console.log('response => newCreditCardAPI', response);
      })
      .catch((error) => {
        console.error('error => newCreditCardAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const updateCreditCard = (clientId: string, credictCard: CreditCard) => {
    states.setIsQueryingAPI(true);

    updateCreditCardAPI(clientId, credictCard)
      .then((response) => {
        console.log('response => updateCreditCardAPI', response);
      })
      .catch((error) => {
        console.error('error => updateCreditCardAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    newCreditCard,
    updateCreditCard,
  };
};