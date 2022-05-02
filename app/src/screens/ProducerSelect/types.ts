import { Product, ProductCard, ProductProducerCode } from '../../globals/interfaces/product';

export type SelectedProductState = null | Product;

export type CardsState = Array<ProductCard>;
;
export type SelectedProducerState = '' | ProductProducerCode;