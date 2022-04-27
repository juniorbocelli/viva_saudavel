import axios from '../../../../globals/axios';
import { API_CLIENT_GET_BY_FILTER } from '../../../../globals/routes';

import { FilterSearch } from '../types';

export default function getClientsByFiltersAPI(filters: FilterSearch) {
  return axios.get(API_CLIENT_GET_BY_FILTER, { params: filters });
};