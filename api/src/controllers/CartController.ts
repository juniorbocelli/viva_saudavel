import { Request, Response } from 'express';

import CartItem from '../models/entities/CartItem';

import DAOCart from '../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../data/persistence/mongo/dao/DAOClient';

import UCManagerCart from '../models/useCases/UCManagerCart';

class CartController {
  static async get(req: Request, res: Response) {
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();

    const ucManagerCart = new UCManagerCart(daoCart, daoProduct, daoClient);

    const { id } = req.params;

    try {
      const cartToSend = await ucManagerCart.get(id);

      res.status(200).json({ cart: cartToSend });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async addItem(req: Request, res: Response) {
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();

    const ucManagerCart = new UCManagerCart(daoCart, daoProduct, daoClient);

    const { id } = req.params;
    const { productId, frequency } = req.body;

    try {
      const newItem = new CartItem(productId, frequency);

      res.status(200).json({ cartItem: await ucManagerCart.addItem(newItem, id) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async removeItem(req: Request, res: Response) {
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();

    const ucManagerCart = new UCManagerCart(daoCart, daoProduct, daoClient);

    const { id } = req.params;
    const { productId, frequency } = req.body;

    try {
      const itemToRemove = new CartItem(productId, frequency);

      res.status(200).json({ cartItem: await ucManagerCart.removeItem(itemToRemove, id) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async changeClientCode(req: Request, res: Response) {
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();

    const ucManagerCart = new UCManagerCart(daoCart, daoProduct, daoClient);

    const { id } = req.params;
    const { clientId } = req.body;

    try {
      res.status(200).json({ cart: await ucManagerCart.changeClientCode(id, clientId) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CartController;