import { consultarCep } from 'correios-brasil';

import Address from '../../models/entities/Address';

class APICep {
  constructor() {

  };

  public async getAddress(cep: Address['cep']): Promise<Address | null> {
    const cepResponse = await consultarCep(cep);

    if (typeof (cepResponse) === 'undefined')
      throw new Error("Cep não encontrado pela API");

    return Address.getAddressByCep(cepResponse.cep, cepResponse.logradouro, cepResponse.bairro, cepResponse.uf, cepResponse.localidade)
  };
};

export default APICep;