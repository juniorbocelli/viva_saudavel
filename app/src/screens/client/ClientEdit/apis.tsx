import { UseFormSetValue } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';

import { IUseStates } from './states';
import { ClientDataForm } from './types';
import { Client } from '../../../globals/interfaces/client';

import { getClientAPI, updateClientAPI } from '../../../services/client';

import MaskApply from '../../../features/utils/MaskApply';

export interface IUseAPIs {
  getClient: (id: string) => void;
  updateClient: (client: Client) => void;
};

export default function useAPIs(states: IUseStates, setValue: UseFormSetValue<ClientDataForm>): IUseAPIs {
  const getClient = (id: string) => {
    states.setIsQueryingAPI(true);

    getClientAPI(id)
      .then((response: AxiosResponse) => {
        console.log('response => getClientAPI', response);
        if (typeof (response.data) === 'undefined') {
          states.setDialogMessage({ title: "Erro", message: "Erro na requisição" });

          return;
        };

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });

          return;
        };

        const client: Client = response.data.client;

        // Setting received data in form
        setValue('cep', MaskApply.maskCep(client.address.cep));
        setValue('street', client.address.street);
        setValue('district', client.address.district);
        setValue('state', client.address.state);
        setValue('city', client.address.city);
        setValue('number', client.address.number);
        setValue('complement', client.address.complement);

        setValue('name', client.name);
        setValue('cpf', MaskApply.maskCpf(client.cpf));
        setValue('email', client.email);
        setValue('password', '');
        setValue('cellPhone', MaskApply.maskCellPhone(client.cellPhone));
        setValue('phone', client.phone && MaskApply.maskPhone(client.phone));
      })
      .catch((error: AxiosError) => {
        console.error('error => getClientAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const updateClient = (client: Client) => {
    states.setIsQueryingAPI(true);

    updateClientAPI(client)
      .then((response) => {
        console.log('response => updateClientAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });

          return;
        };

        states.setDialogMessage({ title: "Sucesso", message: "Seus dados foram salvos" })
      })
      .catch((error) => {
        console.error('error => updateClientAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getClient,
    updateClient,
  };
};