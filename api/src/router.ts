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
router.post(Routes.API_CLIENT_LOGIN, ClientController.login);
router.get(Routes.API_CLIENT_GET_LOGGED, ClientController.getLoggedClient);
router.put(Routes.API_CLIENT_LOGOUT, ClientController.logout);
router.get(Routes.API_CLIENT_GET, Auth.tokenVerify, ClientController.get);

export default router;