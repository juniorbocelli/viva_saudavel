import { IUseStates } from './states';

import { getAllAdminInvoicesAPI } from '../../../services/invoice';
import { Invoice } from '../../../globals/interfaces/invoice';

export interface IUseAPIs {
  getAllAdminInvoices: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getAllAdminInvoices = () => {
    states.setIsQueryingAPI(true);

    getAllAdminInvoicesAPI(states.invoiceFilter)
      .then(response => {
        console.log('response => getAllAdminInvoicesAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const invoices: Array<Invoice> = response.data.invoices;

        states.setInvoices(invoices);

      })
      .catch(error => {
        console.error('error => getAllAdminInvoicesAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getAllAdminInvoices,
  };
};