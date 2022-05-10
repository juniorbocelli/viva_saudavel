import { Request, Response } from 'express';

import CreditCard from '../models/entities/CreditCard';
import DAOCreditCard from '../data/persistence/mongo/dao/DAOCreditCard';
import UCManagerCreditCard from '../models/useCases/UCManagerCreditCard';

class CreditCardController {
  static async new(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const { clientId } = req.params;
    const {
      brand,
      name,
      number,
      expiryDate,
      cvv,
    } = req.body;

    try {
      const creditCard = CreditCard.getNew(clientId, brand, name, number, expiryDate, cvv);
      const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

      const newCard = await ucManegerCreditCard.new(creditCard);

      res.status(200).json({ creditCard: await ucManegerCreditCard.inactiveOthers(newCard.id, clientId) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async get(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const { clientId, id } = req.params;
    const { decrypt } = req.query;

    try {
      const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

      const creditCard = await ucManegerCreditCard.get(id, clientId);

      if (Boolean(decrypt))
        creditCard.decryptCard();

      res.status(200).json({ creditCard: creditCard });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async activateCard(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const { clientId, id, } = req.params;

    try {
      const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

      res.status(200).json({ creditCard: await ucManegerCreditCard.inactiveOthers(id, clientId) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async update(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard;
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const { id } = req.params;
    const {
      clientId,
      brand,
      name,
      number,
      expiryDate,
      cvv,
      isActive,
    } = req.body;

    try {
      const creditCard = CreditCard.getUpdate(id, clientId, brand, name, number, expiryDate, cvv, isActive);

      res.status(200).json({ client: await ucManegerCreditCard.update(creditCard) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAll(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    try {
      res.status(200).json({ creditCards: await ucManegerCreditCard.getAll() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CreditCardController;