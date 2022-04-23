import axios from '../../../../globals/axios';
import { API_PRODUCTS } from '../../../../globals/routes';

export default function getProductAPI() {
  return axios.get(API_PRODUCTS);
};