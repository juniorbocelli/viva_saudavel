import { Product, ProductCard, FilterCodes } from '../../globals/interfaces/product';

export type SelectedProductState = null | Product;

export type CardsState = Array<ProductCard>;
;
export type SelectedFilterState = '' | FilterCodes;