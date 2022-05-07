import APICep from '../../data/apis/APICep';
import Address from '../entities/Address';

class UCManagerAddress {
  private apiCep: APICep;

  constructor(apiCep: UCManagerAddress['apiCep']) {
    this.apiCep = apiCep;
  };

  public async getByCep(cep: Address['cep']): Promise<Address | null> {
    return await this.apiCep.getAddress(cep);
  };
};

export default UCManagerAddress;