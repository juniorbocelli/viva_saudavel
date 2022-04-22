import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import newProductAPI from './newProductAPI';
import getProductAPI from './getProductAPI';

import { IUseStates } from '../states';
import * as Routes from '../../../../globals/routes';
import { ProductFormData } from '../types';

export interface IUseAPIs {
  newProduct: (product: FormData) => void;
  getProduct: () => void;
};

export default function useAPIs(states: IUseStates, methods: UseFormReturn<ProductFormData>): IUseAPIs {
  const navigation = useNavigate();

  const newProduct = (product: FormData) => {
    states.setIsQueryingAPI(true);

    newProductAPI(product)
      .then((response) => {
        console.log('response => newProductAPI', response);

        navigation(`${Routes.SCREEN_ADMIN_PRODUCT_EDIT.replace(":id", response.data.product._id)}`, { replace: true });
      })
      .catch((error) => {
        console.error('error => newProductAPI', error);
        if (typeof (error.message) !== 'undefined')
          states.setDialogMessage({ title: "Erro", message: error.message });
        else
          states.setDialogMessage({ title: "Erro", message: "Ocorreu um erro ao tentar salvar o produto" });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getProduct = () => {

  };

  return {
    newProduct,
    getProduct,
  };
};