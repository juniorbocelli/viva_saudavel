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

export type Products = Array<Product>;

export interface IUseStates {
  products: Products;
  setProducts: React.Dispatch<React.SetStateAction<Products>>;
};