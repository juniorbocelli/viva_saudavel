import { SetFieldValue } from 'react-hook-form';
import getClientAPI from './getClientAPI';
import { IUseStates } from '../states';
import { ClientDataForm } from '../types';
import { Client } from '../../../../features/auth/types';
export interface IUseAPIs {
  getClient: (id: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
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

        console.log('client', client)

        states.setClient({name: client.name});
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