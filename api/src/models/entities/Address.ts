import SanitizerString from '../utils/SanitizerString';

class Address {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number?: string;
  complement?: string;

  constructor(cep: Address['cep'], street: Address['street'], district: Address['district'], state: Address['state'], city: Address['city'], number?: Address['number'], complement?: Address['complement']) {
    this.cep = SanitizerString.onlyNumbers(cep);
    this.street = SanitizerString.removeSpaces(street);
    this.district = SanitizerString.removeSpaces(district);
    this.state = SanitizerString.removeSpaces(state);
    this.city = SanitizerString.removeSpaces(city);
    this.number = SanitizerString.stringOrUndefined(number);
    this.complement = SanitizerString.stringOrUndefined(complement);
  };

  public static getAddressByCep(cep: Address['cep'], street: Address['street'], district: Address['district'], state: Address['state'], city: Address['city']): Address {
    return new Address(cep, street, district, state, city);
  };

  public static getFromObject(a: Address): Address {
    return new Address(a.cep, a.street, a.district, a.state, a.city, a.number, a.complement);
  };
};

export default Address;