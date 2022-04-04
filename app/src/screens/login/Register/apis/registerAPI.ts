import axios from '../../../../globals/axios';
import { API_CLIENT_REGISTER } from '../../../../globals/routes';

import { RegisterDataSend } from '../types';

export default function saveGlobalSettingsAPI(data: RegisterDataSend) {
  return axios.post(API_CLIENT_REGISTER, {
    name: data.name,
    cpf: data.cpf,
    email: data.email,
    password: data.password,
    cellPhone: data.cellPhone,
    phone: data.phone,
  });
};
