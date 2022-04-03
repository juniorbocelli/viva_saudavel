import { Router, Request, Response } from 'express';

import ClientController from './controllers/ClientController';
import * as Routes from './globals/routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

// Post Routes
router.post(Routes.API_CLIENT_REGISTER, ClientController.register);

export default router;