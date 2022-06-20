import axios from 'axios';
import { globalAuth } from '../features/auth/context';
import LocalStorage from '../features/storage/LocalStorage';

const baseURL = "https://warm-meadow-60509.herokuapp.com/";
const apiAxios = axios.create({ headers: { "x-access-token": LocalStorage.getToken() }, baseURL: baseURL });

apiAxios.interceptors.request.use(function (config) {
  if (config.headers)
    config.headers["x-access-token"] = LocalStorage.getToken();

  return config;
});

apiAxios.interceptors.response.use(
  response => {
    if (typeof (response.data) === 'undefined')
      response.data = { error: "Erro em chamada da aPI" }

    return response;
  },
  error => {
    if (typeof (error.data) === 'undefined')
      error.data = { error: "Erro em chamada de API" };

    if (typeof (error.response) === 'undefined')
      error.response = { error: "Erro em chamada de API" };

    if (error.response.status === 401 || error.response.status === 403) {
      console.log("Cliente foi deslogado");
      globalAuth.logout();
    };

    return error;
  },
);

export default apiAxios;