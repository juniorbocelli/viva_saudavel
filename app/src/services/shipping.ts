import axios from '../globals/axios';
import * as Routes from '../globals/routes';

export function getShippingValueByCepAPI(destinationCep: string) {
  return axios.get(Routes.API_SHIPPING_VALUE.replace(':cep', destinationCep),);
};