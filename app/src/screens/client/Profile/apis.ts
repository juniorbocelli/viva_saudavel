import { getCreditCardByFilterAPI } from '../../../services/creditCard';

import { IUseStates } from './states';
import { CreditCard } from '../../../globals/interfaces/creditCard';

export interface IUseAPIs {
  getActiveCreditCard: (clientId: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getActiveCreditCard = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getCreditCardByFilterAPI(clientId, { isActive: true, decrypt: false })
      .then((response) => {
        console.log('response => getCreditCardByFilterAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const creditCards: Array<CreditCard> = response.data.creditCards;

        if (creditCards.length > 0) {
          states.setCreditCard(creditCards[0]);
        } else {
          states.setCreditCard(null);
        };

      })
      .catch((error) => {
        console.log('error => getCreditCardByFilterAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });

      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getActiveCreditCard,
  };
};