import axios from '../../../globals/axios';
import { API_LOGOUT } from '../../../globals/routes';

export default function logoutAPI() {
  return axios.get(API_LOGOUT);
};