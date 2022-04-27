import { Product, } from '../../globals/interfaces/product';
import { FilterCodes } from '../../services/products/apis';
export type SelectedProductState = null | Product;
export type ProductsState = Array<Product>;
export type SelectedFilterState = '' | FilterCodes;