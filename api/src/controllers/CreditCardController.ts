import { Request, Response } from 'express';

import CreditCard from '../models/entities/CreditCard';
import DAOCreditCard from '../data/persistence/mongo/dao/DAOCreditCard';
import UCManagerCreditCard from '../models/useCases/UCManagerCreditCard';
import DAOClient from '../data/persistence/mongo/dao/DAOClient';
import UCManagerClient from '../models/useCases/UCManagerClient';

class CreditCardController {
  static async new(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManagerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const daoClient = new DAOClient();
    const ucManagerClient = new UCManagerClient(daoClient);

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

      // Save client card from client
      await ucManagerClient.addCreditCard(newCard);

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

  static async remove(req: Request, res: Response) {
    const daoCreditCard = new DAOCreditCard();
    const ucManegerCreditCard = new UCManagerCreditCard(daoCreditCard);

    const daoClient = new DAOClient();
    const ucManagerClient = new UCManagerClient(daoClient);

    const { clientId, id } = req.params;

    try {
      // Remove card
      const removedCard = await ucManegerCreditCard.remove(id);

      // Remove card from client
      await ucManagerClient.removeCreditCard(removedCard);
      
      res.status(200).json({ creditCard: removedCard });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default CreditCardController;