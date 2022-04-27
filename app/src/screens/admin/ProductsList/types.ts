import { Product, ProductCategory, ProductProducerCode } from '../../../globals/interfaces/product';

export type ProductsState = Array<Product>;

export type FilterSearch = {
  isKosher?: boolean;
  isLactoseFree?: boolean;
  isA2A2?: boolean;
  isGlutenFree?: boolean;
  isSugarFree?: boolean;
  isNatural?: boolean;

  producerCode?: ProductProducerCode;
  category?: ProductCategory;
};

export type FilterSearchState = FilterSearch | null;