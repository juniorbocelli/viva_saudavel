import { IUseStates } from './states';
import { WeekDaysName } from '../../../globals/interfaces/checkout';

import { getShippingValueByCepAPI } from '../../../services/shipping';
import { getDeliveryDateAPI } from '../../../services/checkout';
import { getCreditCardByFilterAPI } from '../../../services/creditCard';
import Math from '../../../features/utils/Math';
import { CreditCard } from '../../../globals/interfaces/creditCard';

export interface IUseAPIs {
  getShippingValueByCep: (destinationCep: string) => void;
  getDeliveryDate: (weekDay: WeekDaysName) => void;
  getActiveCreditCard: (clientId: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getShippingValueByCep = (destinationCep: string) => {
    states.setIsQueryingAPI(true);

    getShippingValueByCepAPI(destinationCep)
      .then((response) => {
        console.log('response => getShippingValueByCepAPI', response);
        states.setShippingValue(Math.currencyToFloat(response.data.shippingValue));

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getDeliveryDate = (weekDay: WeekDaysName) => {
    states.setIsQueryingAPI(true);

    getDeliveryDateAPI(weekDay)
      .then((response) => {
        console.log('response => getDeliveryDateAPI', response);
        states.setDeliveryDay(response.data.firstDelivery);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        console.log('error => getDeliveryDateAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

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
          states.setHasActiveCard(true);
        } else {
          states.setHasActiveCard(false);
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
    getShippingValueByCep,
    getDeliveryDate,
    getActiveCreditCard,
  };
};