import axios from 'axios';

export const BASE_URL = "http://127.0.0.1:8000";
const apiAxios = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default apiAxios;