import axios from '../../../globals/axios';
import { API_CLIENT_REGISTER } from '../../../globals/routes';
import { Client } from '../types';

export default function registerAPI(client: Client) {
  return axios.post(API_CLIENT_REGISTER,
    {
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      password: client.password,
      cellPhone: client.cellPhone,
      phone: client.phone,
      address: {
        cep: client.address.cep,
        street: client.address.street,
        district: client.address.district,
        state: client.address.state,
        city: client.address.city,
        number: client.address.number,
        complement: client.address.complement,
      }
    }
  );
};