import axios from '../../../../globals/axios';
import { API_PRODUCT_GET_BY_FILTER } from '../../../../globals/routes';

import { FilterSearch } from '../types';

export default function getProductsByFiltersAPI(filters: FilterSearch) {
  return axios.get(API_PRODUCT_GET_BY_FILTER, { params: filters });
};