import { Request, Response } from 'express';

import DAOCheckout from '../data/persistence/mongo/dao/DAOCheckout';
import DAOCart from '../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../data/persistence/mongo/dao/DAOProduct';
import DAOInvoice from '../data/persistence/mongo/dao/DAOInvoice';
import DAOClient from '../data/persistence/mongo/dao/DAOClient';
import DAOCreditCard from '../data/persistence/mongo/dao/DAOCreditCard';

import UCManagerCheckout from '../models/useCases/UCManagerCheckout';
import UCManagerInvoice from '../models/useCases/UCManagerInvoice';

import DELIVERY_SETTINGS from '../settings/delivery.json'
import Delivery from '../models/utils/Delivery';
import { WeekDaysName } from '../models/utils/Dates';
import Checkout from '../models/entities/Checkout';

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

  static async new(req: Request, res: Response) {
    const daoCheckout = new DAOCheckout();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoInvoice = new DAOInvoice();
    const daoClient = new DAOClient();
    const daoCreditCard = new DAOCreditCard();

    const ucManagerCheckout = new UCManagerCheckout(daoCheckout, daoCart, daoProduct);
    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoProduct, daoClient, daoCreditCard);

    const { clientId } = req.params;
    const {
      items,
      deliveryDay,
    } = req.body;

    try {
      const checkout = await ucManagerCheckout.new(Checkout.getNew(clientId, items, deliveryDay))

      res.status(200).json({ invoice: ucManagerInvoice.newFromNewCheckout(checkout) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAll(req: Request, res: Response) {
    const daoCheckout = new DAOCheckout();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();

    const ucManagerCheckout = new UCManagerCheckout(daoCheckout, daoCart, daoProduct);

    try {
      res.status(200).json({ checkouts: ucManagerCheckout.getAll() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CheckoutController;