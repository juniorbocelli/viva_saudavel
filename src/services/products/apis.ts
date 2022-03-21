import { Filter, Products } from "../../features/globalContext/types";

import { products_leite_e_derivados } from '../../fakeData/products/leite-e-derivados';
import { products_queijos } from '../../fakeData/products/queijos';
import { products_hortifruti } from '../../fakeData/products/hortifruti';
import { products_bebidas } from '../../fakeData/products/bebidas';
import { products_doces_e_geleias } from '../../fakeData/products/doces-e-geleias';

const products = products_leite_e_derivados.concat(products_queijos).concat(products_hortifruti).concat(products_bebidas).concat(products_doces_e_geleias);

export interface IUseAPIs {
  getProductsByCategory: (category: Filter['categories']) => Products;
  getProductByFilter: (filter: 'isA2A2' | 'isGlutenFree' | 'isKosher' | 'isLactoseFree' | 'isNatural' | 'isSugarFree') => Products;
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

  const getProductByFilter = (filter: 'isA2A2' | 'isGlutenFree' | 'isKosher' | 'isLactoseFree' | 'isNatural' | 'isSugarFree') => {
    let productsList: Products = [];

    switch (filter) {
      case 'isA2A2':
        products.forEach((item, key) => {
          if (item.filters.isA2A2)
            productsList.push(item);
        });
        break;

      case 'isGlutenFree':
        products.forEach((item, key) => {
          if (item.filters.isGlutenFree)
            productsList.push(item);
        });
        break;

      case 'isKosher':
        products.forEach((item, key) => {
          if (item.filters.isKosher)
            productsList.push(item);
        });
        break;

      case 'isLactoseFree':
        products.forEach((item, key) => {
          if (item.filters.isLactoseFree)
            productsList.push(item);
        });
        break;

      case 'isNatural':
        products.forEach((item, key) => {
          if (item.filters.isNatural)
            productsList.push(item);
        });
        break

      case 'isSugarFree':
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