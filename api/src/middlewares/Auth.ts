import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import DAOClient from '../persistence/mongo/dao/DAOClient';
import Client from '../models/entities/Client';
import UCManagerClient from '../models/useCases/UCManagerClient';

class Auth {
  static async tokenVerify(req: Request, res: Response, next: NextFunction) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY!);
      req.body.client = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };

  static async adminVerify(req: Request, res: Response, next: NextFunction) {
    
  };
};

export default Auth;