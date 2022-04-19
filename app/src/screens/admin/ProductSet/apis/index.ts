import newProductAPI, { IProductNewProps } from './newProductAPI';
import { IUseStates } from '../states';

export interface IUseAPIs {
  newProduct: (product: IProductNewProps) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const newProduct = (product: IProductNewProps) => {
    states.setIsQueryingAPI(true);

    newProductAPI(product)
      .then((response) => {
        console.log('response => newProductAPI', response);
      })
      .catch((error) => {
        console.error('error => newProductAPI', error);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    newProduct,
  };
};