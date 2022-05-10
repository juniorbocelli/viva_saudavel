import { Request, Response } from 'express';

import APIShipping from '../data/apis/APIShipping';
import SHIPPING_SETTING from '../settings/shipping.json';

class ShippingController {
  static async getValueByCep(req: Request, res: Response) {
    const apiShipping = new APIShipping(SHIPPING_SETTING.minValToFreeShipping);

    const { cep } = req.params;

    try {
      const shippingValue = await apiShipping.getValueByCep(SHIPPING_SETTING.originCep, cep);

      res.status(200).json({ shippingValue: shippingValue });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ShippingController;