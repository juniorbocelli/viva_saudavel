import { getAllCheckoutsAPI } from '../../../services/checkout';
import {Checkout} from '../../../globals/interfaces/checkout';

import { IUseStates } from './states';

export interface IUseAPIs {
  getAllCheckouts: (filters: Object) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllCheckouts = (filters: Object = {}) => {
    states.setIsQueryingAPI(true);

    getAllCheckoutsAPI(filters)
      .then((response) => {
        console.log('response => getAllCheckoutsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        console.log('error => getAllCheckoutsAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllCheckouts,
  };
};