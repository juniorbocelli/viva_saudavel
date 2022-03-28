import axios from '../../../../globals/axios';
import { API_FETCH_COMPANY_NAVIGATION } from '../../../../globals/endpoints';

export default function fetchCompanyInfoAPI(ineternal_code: number) {
  return axios.get(API_FETCH_COMPANY_NAVIGATION.replace(":internal_code", String(ineternal_code)));
};