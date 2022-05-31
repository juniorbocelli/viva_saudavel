export interface Address {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: string;
  complement?: string;
};

export interface Client {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password?: string;
  cellPhone: string;
  phone?: string;

  token?: string;

  isActive?: boolean;
  isAdmin?: boolean;
  isMailConfirmed?: boolean;
  createdAt?: Date;

  address: Address;
};


export interface AddressFromCepAPI {
  cep: string;

  street: string;
  district: string;
  city: string;
  state: string;
};