import getProductsAPI from './getProductsAPI';
import getProductsByFiltersAPI from './getProductsByFiltersAPI';

import { IUseStates } from '../states';
import { FilterSearch } from '../types';

export interface IUseAPIs {
  getProducts: () => void;
  getProductsByFilters: (filters: FilterSearch) => void;
};

export default function useAPIs(states: IUseStates): IUseAPIs {
  const getProducts = () => {
    states.setIsQueryingAPI(true);

    getProductsAPI()
      .then((response) => {
        console.log('response => getProductsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const products: IUseStates['products'] = response.data.products;

        states.setProducts(products);
      })
      .catch((error) => {
        console.log('error => getProductsAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar produtos" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getProductsByFilters = (filters: FilterSearch) => {
    states.setIsQueryingAPI(true);

    getProductsByFiltersAPI(filters)
      .then((response) => {
        console.log('response => getProductsByFiltersAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const products: IUseStates['products'] = response.data.products;

        states.setProducts(products);
      })
      .catch((error) => {
        console.log('error => getProductsByFiltersAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar produtos" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getProducts,
    getProductsByFilters,
  };
};