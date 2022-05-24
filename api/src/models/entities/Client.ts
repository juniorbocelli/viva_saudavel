import mongoose from 'mongoose';

import Address from './Address';
import SanitizerString from '../utils/SanitizerString';

class Client {
  id: string | null;

  name: string;
  cpf: string;

  email: string;
  cellPhone: string;
  phone?: string;

  address: Address;

  password: string;
  token: string | null;

  createdAt: Date;
  isActive: boolean;
  isAdmin: boolean;

  constructor(id: Client['id'] | mongoose.Types.ObjectId, name: Client['name'], cpf: Client['cpf'], email: Client['email'], cellPhone: Client['cellPhone'], phone: Client['phone'], address: Address, password: Client['password'], token: Client['token'], createdAt: Client['createdAt'], isActive: Client['isActive'], isAdmin: Client['isAdmin']) {
    this.id = SanitizerString.objectIdToStringOrNull(id);

    this.name = SanitizerString.removeSpaces(name);
    this.cpf = SanitizerString.onlyNumbers(cpf);

    this.email = SanitizerString.removeSpaces(email);
    this.cellPhone = SanitizerString.onlyNumbers(cellPhone);
    this.phone = phone ? SanitizerString.stringOrUndefined(SanitizerString.onlyNumbers(phone)) : phone;

    this.address = address;

    this.password = SanitizerString.removeSpaces(password);
    this.token = token;

    this.createdAt = createdAt;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
  };

  public static getNew(name: Client['name'], cpf: Client['cpf'], email: Client['email'], cellPhone: Client['cellPhone'], phone: Client['phone'], address: Client['address'], password: Client['password']): Client {
    return new Client(null, name, cpf, email, cellPhone, phone, address, password, null, new Date(), true, false);
  };

  public static getUpdated(o: Object, previousClient: Client): Client {
    let client = o as Client;

    const updatedClient: Client = {
      // Imutable fields
      id: previousClient.id,
      cpf: previousClient.cpf,
      email: previousClient.email,
      createdAt: previousClient.createdAt,

      name: client['name'] ? SanitizerString.removeSpaces(client['name']) : previousClient.name,
      cellPhone: client['cellPhone'] ? SanitizerString.onlyNumbers(client['cellPhone']) : previousClient.cellPhone,
      phone: client['phone'] ? SanitizerString.onlyNumbers(client['phone']) : previousClient.phone,

      address: client['address'] || previousClient['address'],

      password: SanitizerString.removeSpaces(client['password']) || previousClient.password,
      token: client['token'] || previousClient.token,

      isActive: client['isActive'] || previousClient.isActive,
      isAdmin: client['isAdmin'] || previousClient.isAdmin,
    };

    return updatedClient;
  };

  public static getFromObject(c: Client): Client {
    return new Client(c.id, c.name, c.cpf, c.email, c.cellPhone, c.phone, c.address, c.password, c.token, c.createdAt, c.isActive, c.isAdmin);
  };
};

export default Client;