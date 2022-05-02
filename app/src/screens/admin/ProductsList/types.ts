import {
  Product,
  ProductCategory,
  ProductProducerCode,
  FilterSearch,
} from '../../../globals/interfaces/product';

export type ProductsState = Array<Product>;

export type FilterSearchState = FilterSearch | null;