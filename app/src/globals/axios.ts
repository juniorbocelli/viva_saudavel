import axios from 'axios';
import { globalAuth } from '../features/auth/context';
import LocalStorage from '../features/storage/LocalStorage';

const baseURL = "http://localhost:5000";
const apiAxios = axios.create({ headers: { "x-access-token": LocalStorage.getToken() }, baseURL: baseURL });

apiAxios.interceptors.request.use(function (config) {
  if (config.headers)
    config.headers["x-access-token"] = LocalStorage.getToken();

  return config;
});

apiAxios.interceptors.response.use(
  response => {
    if (typeof (response.data) === 'undefined')
      response.data = { error: "Erro em chamada a aPI" }

    return response;
  },
  error => {
    if (typeof (error.data) === 'undefined')
      error.data = { error: "Erro em chamada a aPI" };
      
    if (error.response.status === 401 || error.response.status === 403) {
      console.log("Cliente foi deslogado");
      globalAuth.logout();
    };

    return error;
  },
);

export default apiAxios;