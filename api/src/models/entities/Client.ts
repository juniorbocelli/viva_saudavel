import mongoose from 'mongoose';

import Address from './Address';
import CreditCard from './CreditCard';
import Cart from './Cart';
import SanitizerString from '../utils/SanitizerString';

class Client {
  id: mongoose.Types.ObjectId | string | null;

  name: string;
  cpf: string;

  email: string;
  cellPhone: string;
  phone?: string;

  address?: Address;

  creditCards: Array<CreditCard | CreditCard['id']> | null;
  cart: Cart | Cart['id'];

  password?: string;
  token?: string;

  createdAt: Date | null;
  isActive: boolean | null;
  isAdmin: boolean | null;

  constructor(id: Client['id'], name: Client['name'], cpf: Client['cpf'], email: Client['email'], cellPhone: Client['cellPhone'], phone: Client['phone'], address: Address | undefined, creditCards: Client['creditCards'], cart: Client['cart'], password: Client['password'], token: Client['token'], createdAt: Client['createdAt'], isActive: Client['isActive'], isAdmin: Client['isAdmin']) {
    this.id = id;

    this.name = SanitizerString.removeSpaces(name);
    this.cpf = SanitizerString.onlyNumbers(cpf);

    this.email = SanitizerString.removeSpaces(email);
    this.cellPhone = SanitizerString.onlyNumbers(cellPhone);
    this.phone = phone ? SanitizerString.stringOrUndefined(SanitizerString.onlyNumbers(phone)) : phone;

    this.address = address;

    this.creditCards = creditCards || [];
    this.cart = cart;

    this.password = SanitizerString.stringOrUndefined(password);
    this.token = token;

    this.createdAt = createdAt || new Date();
    this.isActive = typeof (isActive) !== 'undefined' ? isActive : true;
    this.isAdmin = typeof (isAdmin) !== 'undefined' ? isAdmin : false;
  };

  public static getNew(name: Client['name'], cpf: Client['cpf'], email: Client['email'], cellPhone: Client['cellPhone'], phone: Client['phone'], address: Client['address'], password: Client['password']): Client {
    return new Client(null, name, cpf, email, cellPhone, phone, address, [], null, password, undefined, null, null, null);
  };

  public static getUpdate(id: mongoose.Types.ObjectId | string, name: Client['name'], cpf: Client['cpf'], email: Client['email'], cellPhone: Client['cellPhone'], phone: Client['phone'], address: Client['address'], creditCards: Client['creditCards'], cart: Client['cart'], password: Client['password'], token: Client['token'], isActive: Client['isActive'], isAdmin: Client['isAdmin']): Client {
    return new Client(id, name, cpf, email, cellPhone, phone, address, creditCards, cart, password, token, null, isActive, isAdmin);
  };

  public static fromObject(c: Client): Client {
    return new Client(c.id, c.name, c.cpf, c.email, c.cellPhone, c.phone, c.address, c.creditCards, c.cart, c.password, c.token, c.createdAt, c.isActive, c.isAdmin);
  };
};

export default Client;