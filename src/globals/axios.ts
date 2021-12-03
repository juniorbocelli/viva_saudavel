import axios from 'axios';
import { globalAuth } from '../features/auth/context';

const baseURL = "http://127.0.0.1:8000";
const apiAxios = axios.create({ baseURL: baseURL, withCredentials: true });


apiAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      console.log("é pra deslogar!");
      globalAuth.logout();
    };

    return error;
  },
);

export default apiAxios;