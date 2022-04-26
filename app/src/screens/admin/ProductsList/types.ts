export type ProductProducerCode = 'aviacao' | 'agua-na-caixa' | 'beta-mel' | 'bufala-almeida-prado' | 'capril-do-bosque' |
  'fazenda-do-bem' | 'goldy' | 'jaguacy' | 'keiff' | 'letti' | 'la-ferme-moderne' | 'mister-rabbit' | 'naturegg' |
  'pardinho-artesanal' | 'piracanjuba' | 'ralston' | 'urakami' | 'verde-campo' | 'villa-piva' | 'xando' | 'yorgus';

export type ProductCategory = 'leite-e-derivados' | 'queijos' | 'frios' | 'hortifruti' | 'bebidas' | 'doces-e-geleias';

export type Filter = {
  isKosher: boolean;
  isLactoseFree: boolean;
  isA2A2: boolean;
  isGlutenFree: boolean;
  isSugarFree: boolean;
  isNatural: boolean;

  producerCode: ProductProducerCode;
  category: ProductCategory;
};

export type Product = {
  id?: string;

  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  filters: Filter;

  price: number;
  images: Array<string>;
  thumb?: string;

  isActive?: boolean;
  quantity?: number;
  createdAT?: Date;
};

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