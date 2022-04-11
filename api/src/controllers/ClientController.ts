import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Client from '../models/entities/Client';
import Address from '../models/entities/Address';
import DAOClient from '../persistence/mongo/dao/DAOClient';
import UCManagerClient from '../models/useCases/UCManagerClient';

class ClientController {
  static async register(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const { name, cpf, email, cellPhone, phone, password, address } = req.body;

    try {
      const clientAddress = new Address(address.cep, address.street, address.district, address.state, address.city, address.number, address.complement);

      const client = new Client(undefined, name, cpf, email, cellPhone, phone, clientAddress, password, undefined, undefined, undefined, undefined);
      const ucManagerClient = new UCManagerClient(client, daoClient);

      res.status(200).json({ client: await ucManagerClient.register() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async login(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const { email, password, } = req.body;

    if (!(email && password)) {
      res.status(400).send({ error: "Dados de login incompletos" });

      return;
    };

    try {
      const client = new Client(undefined, '', '', email, '', '', undefined, password, undefined, undefined, undefined, undefined);
      const ucManagerClient = new UCManagerClient(client, daoClient);

      res.status(200).json({ client: await ucManagerClient.login() });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getLoggedClient(req: Request, res: Response) {
    const daoClient = new DAOClient;
    const token = req.params.token;

    try {
      const client = await daoClient.selectBy({ token: token });

      // Verify if client exist
      if (client.length !== 1) {
        res.status(200).json({ error: "Token inválido" });

        return;
      };

      // Verify if token is valid
      jwt.verify(token, process.env.TOKEN_KEY!);

      res.status(200).json({ client: client[0] });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async logout(req: Request, res: Response) {
    try {
      const token = req.headers["x-access-token"];

      // Verify if token is valid
      jwt.verify(token as string, process.env.TOKEN_KEY!);

      const client = new Client(undefined, '', '', '', '', undefined, undefined, '', token as string, undefined, undefined, undefined);
      const daoClient = new DAOClient();

      const ucManagerClient = new UCManagerClient(client, daoClient);

      ucManagerClient.logout();

      res.status(200).json({ message: "Logout realizado" });

    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const daoClient = new DAOClient();

    try {
      const client = new Client(id, '', '', '', '', undefined, undefined, '', undefined, undefined, undefined, undefined);

      const ucManagerClient = new UCManagerClient(client, daoClient);

      await ucManagerClient.get();

      res.status(200).json({ client: client });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default ClientController;