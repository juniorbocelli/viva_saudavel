import React from 'react';

export type ImagePoduct = {
  path: string;
};

export type Filter = {
  isKosher: boolean;
  isLactoseFree: boolean;
  isA2A2: boolean;
  isGlutenFree: boolean;
  isSugarFree: boolean;
  isNatural: boolean;

  producerCode: 'aviacao' | 'agua-na-caixa' | 'beta-mel' | 'bufala-almeida-prado' | 'capril-do-bosque' |
  'fazenda-do-bem' | 'goldy' | 'jaguacy' | 'keiff' | 'letti' | 'la-ferme-moderne' | 'mister-rabbit' | 'naturegg' |
  'pardinho-artesanal' | 'piracanjuba' | 'ralston' | 'urakami' | 'verde-campo' | 'villa-piva' | 'xando' | 'yorgus';
  categories: 'leite-e-derivados' | 'queijos' | 'frios' | 'hortifruti' | 'bebidas' | 'doces-e-geleias';
};

export type Product = {
  id: string;
  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;
  filters: Filter;
  price: number;
  images: Array<string>;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  quantity: number;
};

export type Cart = Array<CartItem>;

export type Products = Array<Product>;

export interface IUseStates {
  products: Products;
  setProducts: React.Dispatch<React.SetStateAction<Products>>;

  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

export interface IGlobalContext {
  products: Products;
  fetchProducts: () => void;

  cart: Cart;
  addItem: (product: Product, frequency: CartItem['frequency']) => void;
  getCartLenght: () => number;
  getCartValue: () => number;
  getQuantityFromItem: (productId: Product['id']) => number
  addItemByKey: (itemKey: number) => void;
  removeItemByKey: (itemKey: number) => void;
  getProductsByFrequency: (frequency: CartItem['frequency']) => { quantity: number, items: Array<[CartItem, number]> };
};