import axios from '../globals/axios';
import * as Routes from '../globals/routes';
import { Product, FilterSearch } from '../globals/interfaces/product';

export function getProductsAPI() {
  return axios.get(Routes.API_PRODUCT_GET_ALL,);
};

export function getProductsByFiltersAPI(filters: FilterSearch) {
  return axios.get(Routes.API_PRODUCT_GET_BY_FILTER, { params: filters });
};

export function getProductAPI(id: string) {
  return axios.get(Routes.API_PRODUCT_GET.replace(':id', id));
};

export function newProductAPI(product: FormData) {
  return axios.post(Routes.API_PRODUCT_NEW, product, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=&`,
    },
    transformRequest: (data, headers) => {
      return product;
    },
  });
};

export function updateProductAPI(product: FormData, id: Product['id']) {
  return axios.put(Routes.API_PRODUCT_UPDATE.replace(':id', id as string),
    {
      product,
    },
    {
      headers: {
        "Content-Type": `multipart/form-data; boundary=&`,
      },
      transformRequest: (data, headers) => {
        return product;
      },
    });
};