import { getAllCheckoutsClientAPI } from '../../../services/checkout';

import { IUseStates } from './states';
import { CheckoutAPI } from '../../../globals/interfaces/checkout';

export interface IUseAPIs {
  getAllCheckouts: (clientId: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllCheckouts = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getAllCheckoutsClientAPI(clientId, states.checkoutFilter)
      .then((response) => {
        console.log('response => getAllCheckoutsClientAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const checkouts: Array<CheckoutAPI> = response.data.checkouts;

        states.setCheckouts(checkouts);
      })
      .catch((error) => {
        console.log('error => getAllCheckoutsClientAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllCheckouts,
  };
};