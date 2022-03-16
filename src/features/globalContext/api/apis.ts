import { IUseStates } from '../types';
import { products } from './content/products';

export interface IUseAPIs {
  getProducts: () => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getProducts = () => {
    states.setProducts(products);
  };

  return {
    getProducts,
  };
};