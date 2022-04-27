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
  password: string;
  cellPhone: string;
  phone?: string;

  isActive?: boolean;
  isMailConfirmed?: boolean;
  createdAt?: Date;

  address: Address;
};