import SanitizerString from '../utils/SanitizerString';

class Address {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: string;
  complement?: string;

  constructor(cep: string, street: string, district: string, state: string, city: string, number: string, complement: string | undefined) {
    this.cep = SanitizerString.onlyNumbers(cep);
    this.street = SanitizerString.removeSpaces(street);
    this.district = SanitizerString.removeSpaces(district);
    this.state = SanitizerString.removeSpaces(state);
    this.city = SanitizerString.removeSpaces(city);
    this.number = SanitizerString.removeSpaces(number);
    this.complement = SanitizerString.stringOrUndefined(complement);
  };

  static getAddressByCep(cep: string, number: string, complement?: string) {
    
  };
};

export default Address;