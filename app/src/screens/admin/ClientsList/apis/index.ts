import getClientsAPI from './getClientsAPI';
import getClientsByFiltersAPI from './getClientsByFiltersAPI';

import { IUseStates } from '../states';

import { FilterSearch } from '../types';

export interface IUseAPIs {
  getClients: () => void;
  getClientsByFilters: (filters: FilterSearch) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getClients = () => {
    states.setIsQueryingAPI(true);

    getClientsAPI()
      .then((response) => {
        console.log('response => getClientsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const clients: IUseStates['clients'] = response.data.clients;

        states.setClients(clients);
      })
      .catch((error) => {
        console.log('error => getClientsAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar clients" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getClientsByFilters = (filters: FilterSearch) => {
    states.setIsQueryingAPI(true);

    getClientsByFiltersAPI(filters)
      .then((response) => {
        console.log('response => getClientsByFiltersAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const clients: IUseStates['clients'] = response.data.clients;

        states.setClients(clients);
      })
      .catch((error) => {
        console.log('error => getClientsByFiltersAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar clientes" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getClients,
    getClientsByFilters,
  };
};