import axios from 'axios';
import { globalAuth } from '../features/auth/context';

const baseURL = "http://localhost:5000";
const apiAxios = axios.create({ baseURL: baseURL });


apiAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      console.log("é pra deslogar!");
      globalAuth.logout();
    };

    return error;
  },
);

export default apiAxios;