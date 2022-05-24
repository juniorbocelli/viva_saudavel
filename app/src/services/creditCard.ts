import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { CreditCard } from '../globals/interfaces/creditCard';

export function getCreditCardsAPI(clientId: string) {
  return axios.get(Routes.API_CREDIT_CARD_GET_ALL_FROM_CLIENT.replace(':clientId', clientId),);
};

export function getAllCreditAPI(clientId: string) {
  return axios.get(Routes.API_CREDIT_CARD_GET_ALL.replace(':clientId', clientId),);
};

export function getCreditCardAPI(id: CreditCard['id'], clientId: string, decrypt = false) {
  return axios.get(Routes.API_CREDIT_CARD_GET.replace(':clientId', clientId).replace(':id', id as string),
    {
      params: {
        decrypt: decrypt,
      }
    });
};

export function getCreditCardByFilterAPI(clientId: string, filter: Object = {}) {
  return axios.get(Routes.API_CREDIT_CARD_GET_BY_FILTER.replace(':clientId', clientId),
    {
      params: {
        ...filter,
      }
    });
};

export function newCreditCardAPI(clientId: string, creditCard: CreditCard) {
  return axios.post(Routes.API_CREDIT_CARD_NEW.replace(':clientId', clientId), creditCard, {});
};

export function updateCreditCardAPI(clientId: string, creditCard: CreditCard) {
  return axios.put(Routes.API_CREDIT_CARD_UPDATE.replace(':clientId', clientId).replace(':id', creditCard.id as string), creditCard, {});
};

export function activateCreditCardAPI(clientId: string, id: string) {
  return axios.patch(Routes.API_CREDIT_CARD_ACTIVATE.replace(':clientId', clientId).replace(':id', id), {});
};

export function removeCreditCardAPI(clientId: string, id: string) {
  return axios.delete(Routes.API_CREDIT_CARD_REMOVE.replace(':clientId', clientId).replace(':id', id), {});
};