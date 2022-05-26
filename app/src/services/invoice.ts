import axios from '../globals/axios';
import * as Routes from '../globals/routes';

export function getClientInvoiceAPI(clientId: string, id: string) {
  return axios.get(Routes.API_INVOICE_CLIENT_GET
    .replace(':clientId', clientId)
    .replace(':id', id)
  );
};