import axios from '../globals/axios';
import * as Routes from '../globals/routes';

export function getValueByCepAPI(originCep: string, destinationCep: string) {
  return axios.get(Routes.API_SHIPPING_VALUE.replace(':cep', destinationCep),
    {
      params: {
        originCep: originCep,
      }
    });
};