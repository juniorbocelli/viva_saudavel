import { UseFormReturn } from 'react-hook-form';

import { IUseState } from './states';
import { RegisterDataForm } from './types';
import { IAuthContext } from '../../../features/auth/types';
import { AddressFromCepAPI } from '../../../globals/interfaces/client';

import { getAddressByCepAPI } from '../../../services/cep';

import DELIVERY_SETTINGS from '../../../globals/settings/delivery.json';

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

        const address: AddressFromCepAPI = response.data.address;

        if (parseInt(cep) > DELIVERY_SETTINGS['minValidCEP'] && parseInt(cep) < DELIVERY_SETTINGS['maxValidCEP']) {
          states.setReceivedAddress(address);
        } else {
          states.setReceivedAddress(null);
          auth.setErrorMessage("Infelizmente ainda não atendemos na sua região 🙁");
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