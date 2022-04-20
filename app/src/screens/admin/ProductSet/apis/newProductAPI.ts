import axios from '../../../../globals/axios';
import { API_PRODUCT_NEW } from '../../../../globals/routes';
import { Product } from '../types';

export interface IProductNewProps extends Product {
  // files: FileList;
};

export default function getClientAPI(product: FormData) {
  return axios.post(API_PRODUCT_NEW, product, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=&`,
      },
  transformRequest : ( data ,  headers )  =>  { 
    return  product ; 
  } , 
  });
};