import { IProductCardProps } from './types'
import { getProductAPI } from '../../../services/products';

export interface IUseAPIs {
  getProduct: (id: string) => void;
};

export default function useAPIs(setProduct: IProductCardProps['setProduct']): IUseAPIs {
  const getProduct = (id: string) => {
    getProductAPI(id)
      .then((response) => {
        console.log('response => getProductAPI', response);

        if (typeof (response.data.error) !== 'undefined')
          console.error(response.data.error);

        if (typeof (response.data.product) !== 'undefined')
          setProduct(response.data.product);
      })
      .catch((error) => {
        console.error('error => getProductAPI', error);
      })
  };

  return {
    getProduct,
  };
};