import mongoose from 'mongoose';

class Client {
  id: mongoose.Types.ObjectId | string | undefined;

  name: string;
  cpf: string;

  email: string;
  cellPhone: string;
  phone?: string;

  password: string;
  token?: string;

  createdAt: Date;
  isActive: boolean;

  constructor(id: mongoose.Types.ObjectId | string | undefined, name: string, cpf: string, email: string, cellPhone: string, phone: string | undefined, password: string, token: string | undefined, createdAt: Date | undefined, isActive: boolean | undefined) {
    this.id = id;

    this.name = name;
    this.cpf = cpf;

    this.email = email;
    this.cellPhone = cellPhone;
    this.phone = phone;

    this.password = password;
    this.token = token;

    this.createdAt = createdAt || new Date();
    this.isActive = isActive || true;
  };
};

export default Client;