import axios from '../../../../globals/axios';
import { API_PRODUCT_NEW } from '../../../../globals/routes';
import { Product } from '../types';

export interface IProductNewProps extends Product {
  files: Array<File>;
};

export default function getClientAPI(product: IProductNewProps) {
  return axios.post(API_PRODUCT_NEW, {
    product: {
      name: product.name,
      producer: product.producer,
      measure: product.measure,
      description: product.description,
      ingredients: product.ingredients,
      validate: product.validate,

      filters: {
        isKosher: product.filters.isKosher,
        isA2A2: product.filters.isA2A2,
        isGlutenFree: product.filters.isGlutenFree,
        isSugarFree: product.filters.isSugarFree,
        isNatural: product.filters.isNatural,
        isLactoseFree: product.filters.isLactoseFree,

        producerCode: product.filters.producerCode,
        category: product.filters.category,
      },

      price: product.price,
      quantity: product.quantity,

      images: product.images,
    },
    files: product.files,
  });
};