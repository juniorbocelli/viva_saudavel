import { UseFormSetValue } from 'react-hook-form';

import getClientAPI from './getClientAPI';
import { IUseStates } from '../states';
import { ClientDataForm } from '../types';
import { Client } from '../../../../features/auth/types';

export interface IUseAPIs {
  getClient: (id: string) => void;
};

export default function useAPIs(states: IUseStates, setValue: UseFormSetValue<ClientDataForm>): IUseAPIs {
  const getClient = (id: string) => {
    states.setIsQueryingAPI(true);

    getClientAPI(id)
      .then((response) => {
        console.log('response => getClientAPI', response);
        if(typeof(response.data.error) !== 'undefined') {
          states.setErrorMessage(response.data.error);

          return;
        };

        const client: Client = response.data.client;

        // Setting received data in form
        setValue('cep', client.address.cep);
        setValue('street', client.address.street);
        setValue('district', client.address.district);
        setValue('state', client.address.state);
        setValue('city', client.address.city);
        setValue('number', client.address.number);
        setValue('complement', client.address.complement);

        setValue('name', client.name);
        setValue('cpf', client.cpf);
        setValue('email', client.email);
        setValue('cellPhone', client.cellPhone);
        setValue('phone', client.phone);
      })
      .catch((error) => {
        console.log('error => getClientAPI', error);
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getClient,
  };
};