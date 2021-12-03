import axios from '../../../globals/axios';
import { API_PERMISSIONS } from '../../../globals/routes';

export default function permissionsAPI() {
  return axios.get(API_PERMISSIONS);
};