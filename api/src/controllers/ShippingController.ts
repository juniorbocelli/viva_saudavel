import { Request, Response } from 'express';

import APIShipping from '../data/apis/APIShipping';

class ShippingController {
  static async getValueByCep(req: Request, res: Response) {
    const apiShipping = new APIShipping();

    const { cep } = req.params;
    const { originCep } = req.query;

    try {
      const shippingValue = await apiShipping.getValueByCep(originCep as string, cep);

      res.status(200).json({ value: shippingValue });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ShippingController;