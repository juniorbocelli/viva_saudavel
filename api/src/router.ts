import { Router, Request, Response } from 'express';

import ClientController from './controllers/ClientController';
import Auth from './middlewares/Auth';
import * as Routes from './globals/routes';

const router = Router();

router.get('/', Auth.tokenVerify, (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

// Loggin Routes
router.post(Routes.API_CLIENT_REGISTER, ClientController.register);
router.post(Routes.API_CLIENT_LOGGED, Auth.tokenVerify, ClientController.getLoggedClient);

export default router;