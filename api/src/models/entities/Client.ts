import mongoose from 'mongoose';

import Address from './Address';

class Client {
  id: mongoose.Types.ObjectId | string | undefined;

  name: string;
  cpf: string;

  email: string;
  cellPhone: string;
  phone?: string;

  address?: Address;

  password: string;
  token?: string;

  createdAt: Date;
  isActive: boolean;
  isAdmin: boolean;

  constructor(id: mongoose.Types.ObjectId | string | undefined, name: string, cpf: string, email: string, cellPhone: string, phone: string | undefined, address: Address | undefined, password: string, token: string | undefined, createdAt: Date | undefined, isActive: boolean | undefined, isAdmin: boolean | undefined) {
    this.id = id;

    this.name = name;
    this.cpf = cpf;

    this.email = email;
    this.cellPhone = cellPhone;
    this.phone = phone;

    this.address = address;

    this.password = password;
    this.token = token;

    this.createdAt = createdAt || new Date();
    this.isActive = typeof (isActive) !== 'undefined' ? isActive : true;
    this.isAdmin = typeof (isAdmin) !== 'undefined' ? isAdmin : false;
  };
};

export default Client;