import { Client } from '../../../globals/interfaces/client';

export type ClientState = Client | null;

export type ClientDataForm = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  cellPhone: string;
  phone?: string;

  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: string;
  complement?: string;
};