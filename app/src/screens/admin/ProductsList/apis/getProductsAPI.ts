import axios from '../../../../globals/axios';
import { API_PRODUCT_GET_ALL } from '../../../../globals/routes';

export default function getProducstAPI() {
  return axios.get(API_PRODUCT_GET_ALL,);
};