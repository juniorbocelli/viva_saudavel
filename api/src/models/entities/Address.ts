class Address {
  cep: string;
  street: string;
  district: string;
  state: string;
  city: string;
  number: string;
  complement?: string;

  constructor(cep: string, street: string, district: string, state: string, city: string, number: string, complement: string | undefined) {
    this.cep = cep;
    this.street = street;
    this.district = district;
    this.state = state;
    this.city = city;
    this.number = number;
    this.complement = complement;
  };
};

export default Address;