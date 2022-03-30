import { Product, Products, Filter } from '../../features/globalContext/types';
export type SelectedProductState = null | Product;
export type ProductsState = Products;
export type SelectedProducerState = '' | Filter['producerCode'];