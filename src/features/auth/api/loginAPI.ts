import axios from '../../../globals/axios';
import { API_LOGIN } from '../../../globals/routes';

export default function loginAPI(login: string, password: string) {
  return axios.post(API_LOGIN, { login: login, password: password });
};