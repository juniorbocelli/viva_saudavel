import { Request, Response } from 'express';

import CreditCard from '../models/entities/CreditCard';
import DAOCreditCard from '../data/persistence/mongo/dao/DAOCreditCard';
import UCManagerCreditCard from '../models/useCases/UCManagerCreditCard';

class CreditCardController {
  static async new(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManagerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const { clientId } = req.params;
    const {
      brand,
      name,
      number,
      expiry,
      cvc,
    } = req.body;

    try {
      const creditCard = CreditCard.getNew(clientId, brand, name, number, expiry, cvc);

      // Save credit card
      const newCard = await ucManagerCreditCard.new(creditCard);

      // Inactive others and return active card
      res.status(200).json({ creditCard: await ucManagerCreditCard.inactiveOthers(newCard.id as string, clientId) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async get(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const { clientId, id } = req.params;
    const { decrypt } = req.query;

    try {
      const creditCard = await ucManegerCreditCard.get(id, clientId);

      if (Boolean(decrypt))
        creditCard.decryptCard();

      res.status(200).json({ creditCard: creditCard });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  // TODO: Put filters in a url without filter
  static async getByFilter(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const { clientId } = req.params;

    try {
      let filters = req.query;

      const creditCards = await ucManegerCreditCard.getByFilter({ ...filters, client: clientId });

      if (Boolean(filters.decrypt))
        creditCards.forEach(item => {
          item.decryptCard();
        });

      res.status(200).json({ creditCards: creditCards });
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

    const { id, clientId, } = req.params;

    try {
      const previousCreditCard = await ucManegerCreditCard.get(id, clientId);
      previousCreditCard.decryptCard();

      const creditCard = CreditCard.getUpdated(req.body as CreditCard, previousCreditCard);

      res.status(200).json({ creditCard: await ucManegerCreditCard.update(creditCard) });
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

  static async getAllFromClient(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);
    const { clientId } = req.params;

    try {
      res.status(200).json({ creditCards: await ucManegerCreditCard.getAllFromClient(clientId) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async remove(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const { clientId, id } = req.params;

    try {
      // Remove card
      const removedCard = await ucManegerCreditCard.remove(id);

      res.status(200).json({ creditCard: removedCard });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CreditCardController;