import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Product from '../models/entities/Product';
import ProductFilter from '../models/entities/ProductFilter';
import DAOProduct from '../persistence/mongo/dao/DAOProduct';
import UCManagerProduct from '../models/useCases/UCManagerProduct';

class ProductController {
  static async newProduct(req: Request, res: Response) {
    const daoProduct = new DAOProduct;
    const {
      product,
    } = req.body;

    try {

      const newProduct = new Product(product as Product);
      const ucManagerProduct = new UCManagerProduct(daoProduct);

      res.status(200).json({ product: await ucManagerProduct.new(newProduct) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ProductController;