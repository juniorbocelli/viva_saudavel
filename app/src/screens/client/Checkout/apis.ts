import { IUseStates } from './states';
import { WeekDaysName } from '../../../globals/interfaces/checkout';

import { getValueByCepAPI } from '../../../services/shipping';
import { getDeliveryDateAPI } from '../../../services/checkout';

export interface IUseAPIs {
  getValueByCep: () => void;
  getDeliveryDate: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getValueByCep = () => {
    
  };

  const getDeliveryDate = () => {
    if (states.deliveryDay !== null) {
      states.setIsQueryingAPI(true);

      getDeliveryDateAPI(states.deliveryDay as WeekDaysName)
        .then((response) => {

        })
        .catch((error) => {

        })
        .finally(() => {
          states.setIsQueryingAPI(false);
        });
    };
  };

  return {
    getValueByCep,
    getDeliveryDate,
  };
};