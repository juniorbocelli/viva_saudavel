import { Request, Response } from 'express';

import DELIVERY_SETTINGS from '../settings/delivery.json'
import Delivery from '../models/utils/Delivery';

class CheckoutController {
  static async get(req: Request, res: Response) {
    const dates = new Delivery(DELIVERY_SETTINGS.minDaysToFirstDelivery, DELIVERY_SETTINGS.isDeliveryInHolidays, DELIVERY_SETTINGS.isDeliveryInWeekends);

    try {
      let dates: Array<Date> = [];
      const weekDays = req.query;

      res.status(200).json({ firstDelivery: '' });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CheckoutController;