import { getAdminInvoiceAPI } from '../../../services/invoice';

import { IUseStates } from './states';
import { Invoice } from '../../../globals/interfaces/invoice';

export interface IUseAPIs {
  getAdminInvoice: (id: string) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAdminInvoice = (id: string) => {
    states.setIsQueryingAPI(true);

    getAdminInvoiceAPI(id)
      .then(response => {
        console.log('response => getAdminInvoiceAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const invoice: Invoice = response.data.invoice;

        states.setInvoice(invoice);
      })
      .catch(error => {
        console.error('error => getAdminInvoiceAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAdminInvoice,
  };
};