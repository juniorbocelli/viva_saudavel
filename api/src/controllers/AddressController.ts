import { Request, Response } from 'express';

import APICep from '../data/apis/APICep';
import UCManagerAddress from '../models/useCases/UCManagerAddress';

class CartController {
  static async getByCep(req: Request, res: Response) {
    const apiCep = new APICep();
    const ucManagerAddress = new UCManagerAddress(apiCep);

    const { cep } = req.params;

    try {
      const address = await ucManagerAddress.getByCep(cep);

      res.status(200).json({ address: address });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CartController;