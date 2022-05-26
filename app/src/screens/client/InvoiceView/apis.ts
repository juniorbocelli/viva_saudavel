import { getClientInvoiceAPI } from '../../../services/invoice';

import { IUseStates } from './states';
import { Invoice } from '../../../globals/interfaces/invoice';

export interface IUseAPIs {
  getClientInvoice: (clientId: string, id: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getClientInvoice = (clientId: string, id: string) => {
    states.setIsQueryingAPI(true);

    getClientInvoiceAPI(clientId, id)
      .then(response => {
        console.log('response => getClientInvoiceAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const invoice: Invoice = response.data.invoice;

        states.setInvoice(invoice);
      })
      .catch(error => {
        console.error('error => getClientInvoiceAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getClientInvoice,
  };
};