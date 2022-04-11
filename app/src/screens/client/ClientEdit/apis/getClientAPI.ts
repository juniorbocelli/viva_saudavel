import axios from '../../../../globals/axios';
import { API_CLIENT_GET } from '../../../../globals/routes';

export default function getClientAPI(id: string) {
  return axios.get(API_CLIENT_GET.replace(':id', id));
};