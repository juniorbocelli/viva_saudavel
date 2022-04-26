import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import { AxiosError } from 'axios';

import newProductAPI from './newProductAPI';
import getProductAPI from './getProductAPI';
import updateProductAPI from './updateProductAPI';

import { IUseStates } from '../states';
import * as Routes from '../../../../globals/routes';
import { ProductFormData, Product, } from '../types';
import MaskApply from '../../../../features/utils/MaskApply';

export interface IUseAPIs {
  newProduct: (product: FormData) => void;
  getProduct: () => void;
  updateProduct: (product: FormData) => void;
};

export default function useAPIs(states: IUseStates, methods: UseFormReturn<ProductFormData>): IUseAPIs {
  const navigation = useNavigate();

  const newProduct = (product: FormData) => {
    states.setIsQueryingAPI(true);

    newProductAPI(product)
      .then((response) => {
        console.log('response => newProductAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const product: Product = response.data.product;

        states.setProductImages([]);
        product.images.forEach(image => {
          states.setProductImages(state => [...state, image]);
        });
        states.setImages([]);

        navigation(`${Routes.SCREEN_ADMIN_PRODUCT_EDIT.replace(":id", response.data.product._id)}`, { replace: true });
      })
      .catch((error: AxiosError) => {
        console.error('error => newProductAPI', error);
        if (typeof (error.response) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.response.data });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar salvar o produto" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getProduct = () => {
    states.setIsQueryingAPI(true);

    if (typeof (states.productId) !== 'undefined')
    getProductAPI(states.productId)
        .then((response) => {
          console.log('response => getProductAPI', response);

          if (typeof (response.data.error) !== 'undefined') {
            states.setDialogMessage({ title: "Erro", message: response.data.error });
            return;
          };

          const product: Product = response.data.product;

          methods.setValue('name', product.name);
          methods.setValue('producer', product.producer);
          methods.setValue('measure', product.measure);
          methods.setValue('description', product.description);
          methods.setValue('ingredients', product.ingredients);
          methods.setValue('validate', product.validate);
          methods.setValue('price', MaskApply.maskMoney(product.price));

          methods.setValue('isActive', !!product.isActive);

          product.images.forEach(image => {
            states.setProductImages(state => [...state, image]);
          });

          methods.setValue('quantity', typeof (product.quantity) !== 'undefined' ? String(product.quantity) : '');

          methods.setValue('isKosher', product.filters.isKosher);
          methods.setValue('isA2A2', product.filters.isA2A2);
          methods.setValue('isGlutenFree', product.filters.isGlutenFree);
          methods.setValue('isSugarFree', product.filters.isSugarFree);
          methods.setValue('isNatural', product.filters.isNatural);
          methods.setValue('isLactoseFree', product.filters.isLactoseFree);

          methods.setValue('producerCode', product.filters.producerCode);
          methods.setValue('category', product.filters.category);
        })
        .catch((error) => {
          console.error('error => getProductAPI', error);
          if (typeof (error.message) !== 'undefined')
            states.setDialogMessage({ title: "Erro", message: error.message });
          else
            states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar buscar o produto" });
        })
        .finally(() => {
          states.setIsQueryingAPI(false);
        });
  };

  const updateProduct = (product: FormData) => {
    states.setIsQueryingAPI(true);

    updateProductAPI(product, states.productId)
      .then((response) => {
        console.log('response => updateProductAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const product: Product = response.data.product;

        states.setProductImages([]);
        product.images.forEach(image => {
          states.setProductImages(state => [...state, image]);
        });
        states.setImages([]);

      })
      .catch((error) => {
        console.error('error => updateProductAPI', error);

        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar atualizar o produto" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    newProduct,
    getProduct,
    updateProduct,
  };
};