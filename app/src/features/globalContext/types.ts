import React from 'react';
import { Product } from '../../globals/interfaces/product';
import { CartItem } from '../../globals/interfaces/cart';

export type Cart = Array<CartItem>;

export type Products = Array<Product>;

export interface IUseStates {
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
};

export interface CartProvider {
  cart: Cart;
  addItem: (product: Product, frequency: CartItem['frequency']) => void;
  getCartLenght: () => number;
  getCartValue: () => number;
  getQuantityFromItem: (productId: Product['id']) => number
  addItemByKey: (itemKey: number) => void;
  removeItemByKey: (itemKey: number) => void;
  getProductsByFrequency: (frequency: CartItem['frequency']) => { quantity: number, items: Array<[CartItem, number]> };
}

export interface IGlobalContext {
  cart: CartProvider;
};