import axios from '../../../globals/axios';
import { API_CLIENT_LOGIN } from '../../../globals/routes';

export default function loginAPI(email: string, password: string) {
  return axios.post(API_CLIENT_LOGIN, { email: email, password: password });
};