import axios from '../../../globals/axios';
import { API_CLIENT_LOGGED } from '../../../globals/routes';

export default function checkSessionAPI(token: string) {
  return axios.get(API_CLIENT_LOGGED.replace(':token', token));
};