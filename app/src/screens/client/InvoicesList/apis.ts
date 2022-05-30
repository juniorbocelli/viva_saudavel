import { IUseStates } from './states';

import { getAllClientInvoicesAPI } from '../../../services/invoice';
import { Invoice } from '../../../globals/interfaces/invoice';

export interface IUseAPIs {
  getAllClientInvoices: (clientId: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllClientInvoices = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getAllClientInvoicesAPI(clientId, states.invoiceFilter)
      .then(response => {
        console.log('response => getAllClientInvoicesAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const invoices: Array<Invoice> = response.data.invoices;

        states.setInvoices(invoices);

      })
      .catch(error => {
        console.error('error => getAllClientInvoicesAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllClientInvoices,
  };
};