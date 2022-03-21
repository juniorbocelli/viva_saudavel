import { IUseStates } from '../types';
import { products_leite_e_derivados } from './content/products/leite-e-derivados';
import { products_queijos } from './content/products/queijos';
import { products_bebidas } from './content/products/bebidas';
import { products_doces_e_geleias } from './content/products/doces-e-geleias';

export interface IUseAPIs {
  getProducts: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getProducts = () => {
    states.setProducts(products_leite_e_derivados.concat(products_queijos).concat(products_bebidas).concat(products_doces_e_geleias));
  };

  return {
    getProducts,
  };
};