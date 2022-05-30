import { Request, Response } from 'express';

import Invoice from '../models/entities/Invoice';

import DAOInvoice from '../data/persistence/mongo/dao/DAOInvoice';
import DAOCart from '../data/persistence/mongo/dao/DAOCart';
import DAOProduct from '../data/persistence/mongo/dao/DAOProduct';
import DAOClient from '../data/persistence/mongo/dao/DAOClient';
import DAOCreditCard from '../data/persistence/mongo/dao/DAOCreditCard';
import DAOCheckout from '../data/persistence/mongo/dao/DAOCheckout';

import UCManagerInvoice from '../models/useCases/UCManagerInvoice';

class InvoiceController {
  static async getClientInvoice(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();
    const daoCreditCard = new DAOCreditCard();
    const daoCheckout = new DAOCheckout();

    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoProduct, daoClient, daoCreditCard, daoCheckout, daoCart);

    const { clientId, id } = req.params;

    try {
      const invoiceToSend = await ucManagerInvoice.getClientInvoice(clientId, id);

      res.status(200).json({ invoice: invoiceToSend });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAdminInvoice(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();
    const daoCreditCard = new DAOCreditCard();
    const daoCheckout = new DAOCheckout();

    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoProduct, daoClient, daoCreditCard, daoCheckout, daoCart);

    const { id } = req.params;

    try {
      const invoiceToSend = await ucManagerInvoice.getAdminInvoice(id);

      res.status(200).json({ invoice: invoiceToSend });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAllClientWithFilter(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();
    const daoCreditCard = new DAOCreditCard();
    const daoCheckout = new DAOCheckout();

    const { clientId } = req.params

    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoProduct, daoClient, daoCreditCard, daoCheckout, daoCart);

    try {
      res.status(200).json({ invoices: await ucManagerInvoice.getAllClientWithFilter(clientId, req.query) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getAllAdminWithFilter(req: Request, res: Response) {
    const daoInvoice = new DAOInvoice();
    const daoCart = new DAOCart();
    const daoProduct = new DAOProduct();
    const daoClient = new DAOClient();
    const daoCreditCard = new DAOCreditCard();
    const daoCheckout = new DAOCheckout();

    const { clientId } = req.params

    const ucManagerInvoice = new UCManagerInvoice(daoInvoice, daoProduct, daoClient, daoCreditCard, daoCheckout, daoCart);

    try {
      res.status(200).json({ invoices: await ucManagerInvoice.getAllAdminWithFilter(req.query) });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default InvoiceController;