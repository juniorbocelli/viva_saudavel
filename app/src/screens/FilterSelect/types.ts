import { Product, Products } from '../../features/globalContext/types';
import { FilterCodes } from '../../services/products/apis';
export type SelectedProductState = null | Product;
export type ProductsState = Products;
export type SelectedFilterState = '' | FilterCodes;