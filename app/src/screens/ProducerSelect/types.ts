import { Product, Filter } from '../../globals/interfaces/product';
export type SelectedProductState = null | Product;
export type ProductsState = Array<Product>;
export type SelectedProducerState = '' | Filter['producerCode'];