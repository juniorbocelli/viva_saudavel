import { calcularPrecoPrazo } from 'correios-brasil';

class APIShipping {
  minValToFreeShipping: number | null;
  constructor(minValToFreeShipping: APIShipping['minValToFreeShipping']) {
    this.minValToFreeShipping = minValToFreeShipping;
  };

  public async getValueByCep(originCep: string, destinationCep: string): Promise<string> {
    // Fake data 
    const args = {
      sCepOrigem: originCep,
      sCepDestino: destinationCep,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014'],
      nVlDiametro: '0',
    };

    const response = await calcularPrecoPrazo(args)

    if (typeof (response) === 'undefined')
      throw new Error("O frete não pode ser calculdo pela API");

    return response[0].Valor;
  };
};

export default APIShipping;