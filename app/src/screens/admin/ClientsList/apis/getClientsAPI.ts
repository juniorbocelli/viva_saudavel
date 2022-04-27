import axios from '../../../../globals/axios';
import { API_CLIENT_GET_ALL } from '../../../../globals/routes';

export default function getClientsAPI() {
  return axios.get(API_CLIENT_GET_ALL,);
};