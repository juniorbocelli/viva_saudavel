import axios from 'axios';
import { globalAuth } from '../features/auth/context';
import LocalStorage from '../features/storage/LocalStorage';

const baseURL = "http://localhost:5000";
const apiAxios = axios.create({ headers: {"x-access-token": LocalStorage.getToken()}, baseURL: baseURL });


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