import axios from '../globals/axios';
import * as Routes from '../globals/routes';

// export function getAddressByCepAPI(filters: FilterSearch) {
//   return axios.get(Routes.API_CEP_GET_ADDRESS, { params: filters });
// };

export function getAddressByCepAPI(cep: string) {
  return axios.get(Routes.API_CEP_GET_ADDRESS.replace(':cep', cep));
};