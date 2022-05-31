import { getAllAdminCheckoutsAPI } from '../../../services/checkout';

import { IUseStates } from './states';

export interface IUseAPIs {
  getAllCheckouts: (filters: Object) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllCheckouts = (filters: Object = {}) => {
    states.setIsQueryingAPI(true);

    getAllAdminCheckoutsAPI(filters)
      .then((response) => {
        console.log('response => getAllAdminCheckoutsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error) => {
        console.log('error => getAllAdminCheckoutsAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllCheckouts,
  };
};