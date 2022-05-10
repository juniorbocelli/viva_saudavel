import { IUseStates } from './states';
import { WeekDaysName } from '../../../globals/interfaces/checkout';

import { getShippingValueByCepAPI } from '../../../services/shipping';
import { getDeliveryDateAPI } from '../../../services/checkout';
import Math from '../../../features/utils/Math';

export interface IUseAPIs {
  getShippingValueByCep: (destinationCep: string) => void;
  getDeliveryDate: (weekDay: WeekDaysName) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getShippingValueByCep = (destinationCep: string) => {
    states.setIsQueryingAPI(true);

    getShippingValueByCepAPI(destinationCep)
      .then((response) => {
        console.log('response => getShippingValueByCepAPI', response);
        states.setShippingValue(Math.currencyToFloat(response.data.shippingValue));
      })
      .catch((error) => {

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
      })
      .catch((error) => {

      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getShippingValueByCep,
    getDeliveryDate,
  };
};