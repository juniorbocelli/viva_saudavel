import { getAllCheckoutsAdminAPI } from '../../../services/checkout';

import { IUseStates } from './states';
import { CheckoutAPI } from '../../../globals/interfaces/checkout';

export interface IUseAPIs {
  getAllCheckouts: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllCheckouts = () => {
    states.setIsQueryingAPI(true);

    getAllCheckoutsAdminAPI(states.checkoutFilter)
      .then((response) => {
        console.log('response => getAllCheckoutsAdminAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const checkouts: Array<CheckoutAPI> = response.data.checkouts;

        states.setCheckouts(checkouts);
      })
      .catch((error) => {
        console.log('error => getAllCheckoutsAdminAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllCheckouts,
  };
};