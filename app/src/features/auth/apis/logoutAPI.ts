import axios from '../../../globals/axios';
import { API_CLIENT_LOGOUT } from '../../../globals/routes';

export default function logoutAPI() {
  return axios.put(API_CLIENT_LOGOUT, {});
};