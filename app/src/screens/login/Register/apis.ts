import { UseFormReturn } from 'react-hook-form';

import { IUseState } from './states';
import { RegisterDataForm } from './types';
import { IAuthContext } from '../../../features/auth/types';

import { getAddressByCepAPI } from '../../../services/cep';

export interface IUseAPIs {
  getAddressByCep: (cep: string) => void;
};

export default function useAPIs(states: IUseState, auth: IAuthContext['feedback'], methods: UseFormReturn<RegisterDataForm>): IUseAPIs {
  const getAddressByCep = (cep: string) => {
    auth.setIsQueryingAPI(true);

    getAddressByCepAPI(cep)
      .then(response => {
        console.log('response => getAddressByCepAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          auth.setErrorMessage(response.data.error);
          return;
        };

        if (parseInt(cep) > 13560001 && parseInt(cep) < 13577999) {
          states.setIsFromRegion(true);

          // TODO: exchange by address state and useEffect
          setTimeout(() => {
            methods.setValue('street', response.data.address.street);
          }, 2000);
        } else {
          states.setIsFromRegion(false);
        }
      })
      .catch(error => {
        console.error('error => getAddressByCepAPI', error);
        auth.setErrorMessage(error.message);
      })
      .finally(() => {
        auth.setIsQueryingAPI(false);
      });
  };

  return {
    getAddressByCep,
  };
};