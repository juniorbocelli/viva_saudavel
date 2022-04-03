import { Request, Response } from 'express';
import DAOClient from '../persistence/mongo/dao/DAOClient';
import Client from '../models/entities/Client';
import UCManagerClient from '../models/useCases/UCManagerClient';

class ClientControler {
  static async register(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const { name, cpf, email, cellPhone, phone, password, } = req.body;

    try {
      const client = new Client(undefined, name, cpf, email, cellPhone, phone, password, undefined, undefined, undefined);
      const ucManagerClient = new UCManagerClient(client, daoClient);

      res.status(200).json({ token: await ucManagerClient.registerClient() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ClientControler;