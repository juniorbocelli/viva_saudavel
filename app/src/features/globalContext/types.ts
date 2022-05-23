import { CartItem, CartItemContainer } from '../../globals/interfaces/cart';
import { Product } from '../../globals/interfaces/product';

export type CartState = Array<CartItem>;

export type OnceItemsState = Array<CartItemContainer>;

export type WeeklyItemsState = Array<CartItemContainer>;
export type BiweeklyItemsState = Array<CartItemContainer>;
export type MonthlyItemsState = Array<CartItemContainer>;

export type IsQueryingAPIState = boolean;

export type DialogMessage = {
  title?: string;
  message: string;
};
export type DialogMessageState = undefined | DialogMessage;

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  cart: CartState;
  setCart: React.Dispatch<React.SetStateAction<CartState>>;

  onceItems: OnceItemsState;
  setOnceItems: React.Dispatch<React.SetStateAction<OnceItemsState>>;

  weeklyItems: WeeklyItemsState;
  setWeeklyItems: React.Dispatch<React.SetStateAction<WeeklyItemsState>>;

  biweeklyItems: BiweeklyItemsState;
  setBiweeklyItems: React.Dispatch<React.SetStateAction<BiweeklyItemsState>>;

  monthlyItems: MonthlyItemsState;
  setMonthlyItems: React.Dispatch<React.SetStateAction<MonthlyItemsState>>;
};

export interface CartProvider {
  cart: CartState;

  onceItems: OnceItemsState;
  weeklyItems: WeeklyItemsState;
  biweeklyItems: BiweeklyItemsState;
  monthlyItems: MonthlyItemsState;

  feedbacks: {
    isQueryingAPI: IsQueryingAPIState;

    dialogMessage: DialogMessageState;
    setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;
  };

  getCart: (clientId: string) => void;
  addItem: (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => void;
  removeItem: (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => void;

  getTotalItems: (items: Array<CartItemContainer>) => number;
  getTotalCartPrice: (items: Array<CartItem>) => number;
};

export interface IGlobalContext {
  cart: CartProvider;
};

export interface IUseCartAPIs {
  getCart: (clientId: string) => void;
  addItem: (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => void;
  removeItem: (id: string, productId: CartItem['productId'], frequency: CartItem['frequency']) => void;
};

export interface IUseCart {
  getTotalItems: (items: Array<CartItemContainer>) => number;
  getTotalCartPrice: (items: Array<CartItem>) => number;
};

export interface CartItemFromAPI {
  frequency: CartItem['frequency'];
  product: Product;
};