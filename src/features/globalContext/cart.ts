import {
  IUseStates,

  Product,
  CartItem,
} from './types';

interface IUseCart {
  addProduct: (product: Product, frequency: CartItem['frequency']) => void;
  getCartLenght: () => number;
  getCartValue: () => number;
  getQuantityFromItem: (productId: Product['id']) => number
  removeItem: (itemKey: number) => void;
};

export default function useCart(states: IUseStates): IUseCart {
  // Adiciona novo produto ao carrinho
  const addProduct = (product: Product, frequency: CartItem['frequency']) => {
    let newCart = states.cart.slice();

    // Passa por cada produto para ver se cria uma nova entrada ou altera uma existente
    states.cart.forEach((item, key) => {
      if (item.id === product.id && item.frequency === frequency) {
        newCart[key] = { ...newCart[key], quantity: newCart[key].quantity + 1 };
        states.setCart(newCart);
        return;
      };
    });

    newCart.push(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        frequency: frequency,
        quantity: 1,
      }
    );

    states.setCart(newCart)
  };

  const getCartLenght = (): number => {
    let products = 0;

    states.cart.forEach((item) => {
      products += item.quantity;
    });

    return products;
  };

  const getCartValue = (): number => {
    let value = 0;

    states.cart.forEach((item) => {
      value += item.quantity * item.price;
    });

    return value;
  };

  const getQuantityFromItem = (productId: Product['id']): number => {
    let quantity = 0;

    states.cart.forEach((item) => {
      if (item.id === productId)
        quantity += item.quantity;
    });

    return quantity;
  };

  const removeItem = (itemId: number) => {
    let newCart = states.cart.slice();

    if (newCart[itemId].quantity > 0)
      newCart[itemId] = { ...newCart[itemId], quantity: newCart[itemId].quantity - 1 }
    else
      newCart.splice(itemId, 1);

    states.setCart(newCart);
  };

  return {
    addProduct,
    getCartLenght,
    getCartValue,
    getQuantityFromItem,
    removeItem,
  };
};