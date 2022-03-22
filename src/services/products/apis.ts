import { Filter, Products } from "../../features/globalContext/types";

import { products_leite_e_derivados } from '../../fakeData/products/leite-e-derivados';
import { products_queijos } from '../../fakeData/products/queijos';
import { products_hortifruti } from '../../fakeData/products/hortifruti';
import { products_bebidas } from '../../fakeData/products/bebidas';
import { products_doces_e_geleias } from '../../fakeData/products/doces-e-geleias';

export type FilterCodes = 'a2a2' | 'sem-gluten' | 'kosher' | 'sem-lactose' | 'natural' | 'sem-adicao-de-acucar'

const products = products_leite_e_derivados.concat(products_queijos).concat(products_hortifruti).concat(products_bebidas).concat(products_doces_e_geleias);

export interface IUseAPIs {
  getProductsByCategory: (category: Filter['categories']) => Products;
  getProductByFilter: (filter: FilterCodes) => Products;
  getProductsByProducer: (producer: Filter['producerCode']) => Products;
};

export default function useAPIs(): IUseAPIs {
  const getProductsByCategory = (category: Filter['categories']) => {
    let productsList: Products = [];

    products.forEach((item, key) => {
      if (item.filters.categories === category)
        productsList.push(item);
    });

    return productsList;
  };

  const getProductByFilter = (filter: FilterCodes) => {
    let productsList: Products = [];

    switch (filter) {
      case 'a2a2':
        products.forEach((item, key) => {
          if (item.filters.isA2A2)
            productsList.push(item);
        });
        break;

      case 'sem-gluten':
        products.forEach((item, key) => {
          if (item.filters.isGlutenFree)
            productsList.push(item);
        });
        break;

      case 'kosher':
        products.forEach((item, key) => {
          if (item.filters.isKosher)
            productsList.push(item);
        });
        break;

      case 'sem-lactose':
        products.forEach((item, key) => {
          if (item.filters.isLactoseFree)
            productsList.push(item);
        });
        break;

      case 'natural':
        products.forEach((item, key) => {
          if (item.filters.isNatural)
            productsList.push(item);
        });
        break

      case 'sem-adicao-de-acucar':
        products.forEach((item, key) => {
          if (item.filters.isSugarFree)
            productsList.push(item);
        });
        break

      default:
        return [];
    };

    return productsList;
  };

  const getProductsByProducer = (producer: Filter['producerCode']) => {
    let productsList: Products = [];

    products.forEach((item, key) => {
      if (item.filters.producerCode === producer)
        productsList.push(item);
    });

    return productsList;
  };

  return {
    getProductsByCategory,
    getProductByFilter,
    getProductsByProducer,
  };
};