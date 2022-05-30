import { Client } from '../../../globals/interfaces/client';

export type IsQueryingAPIState = boolean;
export type ErrorMessageState = string | undefined;

export type IsFromRegionState = boolean;

export type RegisterDataForm = {
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

export type RegisterDataSend = {
  client: Client;
};