import axios from '../globals/axios';
import * as Routes from '../globals/routes';

export function getAllClientInvoicesAPI(clientId: string, filters: Object = {}) {
  return axios.get(Routes.API_INVOICE_CLIENT_GET_ALL
    .replace(':clientId', clientId), {
    params: {
      ...filters,
    }
  });
};

export function getClientInvoiceAPI(clientId: string, id: string) {
  return axios.get(Routes.API_INVOICE_CLIENT_GET
    .replace(':clientId', clientId)
    .replace(':id', id)
  );
};

export function getAllAdminInvoicesAPI(filters: Object = {}) {
  return axios.get(Routes.API_INVOICE_ADMIN_GET_ALL, {
    params: {
      ...filters,
    }
  });
};

export function getAdminInvoiceAPI(id: string) {
  return axios.get(Routes.API_INVOICE_ADMIN_GET
    .replace(':id', id)
  );
};