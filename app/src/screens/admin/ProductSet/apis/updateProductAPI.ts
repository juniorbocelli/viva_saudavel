import axios from '../../../../globals/axios';
import { API_PRODUCT_UPDATE } from '../../../../globals/routes';
import { Product } from '../../../../globals/interfaces/product';

export default function updateProductAPI(product: FormData, id: Product['id']) {
  return axios.put(API_PRODUCT_UPDATE.replace(':id', id as string),
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