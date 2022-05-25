import SanitizerString from '../utils/SanitizerString';
import Client from './Client';

class InvoiceReceiverData {
  name: string;
  cpf: string;
  email: string;
  cellPhone: string;

  constructor(name: string, cpf: string, email: string, cellPhone: string) {
    this.name = SanitizerString.removeSpaces(name);
    this.cpf = SanitizerString.onlyNumbers(cpf);
    this.email = SanitizerString.removeSpaces(email);
    this.cellPhone = SanitizerString.onlyNumbers(cellPhone);
  };

  public static getNewFromClient(c: Client): InvoiceReceiverData {
    return new InvoiceReceiverData(c.name, c.cpf, c.email, c.cellPhone);
  };
};

export default InvoiceReceiverData;