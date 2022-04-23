import axios from '../../../../globals/axios';
import { API_PRODUCT_UPDATE } from '../../../../globals/routes';

export default function updateProductAPI(product: FormData) {
  return axios.put(API_PRODUCT_UPDATE, product, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=&`,
    },
    transformRequest: (data, headers) => {
      return product;
    },
  });
};