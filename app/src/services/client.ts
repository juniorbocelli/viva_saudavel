import axios from '../globals/axios';
import * as Routes from '../globals/routes';

import { Client } from '../globals/interfaces/client';

export function getClientAPI(id: string) {
  return axios.get(Routes.API_CLIENT_GET
    .replace(':id', id));
};

export function updateClientAPI(client: Client) {
  return axios.put(Routes.API_CLIENT_UPDATE
    .replace(':id', client.id as string),
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