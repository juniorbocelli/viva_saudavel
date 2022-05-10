import { Request, Response } from 'express';

import DELIVERY_SETTINGS from '../settings/delivery.json'
import Delivery from '../models/utils/Delivery';
import { WeekDaysName } from '../models/utils/Dates';

class CheckoutController {
  static async getDeliveryDate(req: Request, res: Response) {
    const delivery = new Delivery(DELIVERY_SETTINGS.minDaysToFirstDelivery, DELIVERY_SETTINGS.isDeliveryInHolidays, DELIVERY_SETTINGS.isDeliveryInWeekends);

    try {
      const weekDay: WeekDaysName = req.params.weekDay as WeekDaysName;

      res.status(200).json({ firstDelivery: delivery.getFirstDeliveryDate(weekDay) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CheckoutController;