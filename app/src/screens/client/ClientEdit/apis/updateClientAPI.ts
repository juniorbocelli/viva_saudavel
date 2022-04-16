import axios from '../../../../globals/axios';
import { API_CLIENT_UPDATE } from '../../../../globals/routes';
import { Client } from '../../../../features/auth/types';

export interface IClientUpdateProps extends Client {
  id: string;
};

export default function updateClientAPI(client: IClientUpdateProps) {
  return axios.put(API_CLIENT_UPDATE.replace(':id', client.id),
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