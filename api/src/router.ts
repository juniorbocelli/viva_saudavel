import { Router, Request, Response } from 'express';

import ClientController from './controllers/ClientController';
import ProductController from './controllers/ProductController';
import Auth from './middlewares/Auth';
import * as Routes from './globals/routes';

const router = Router();

// User routes
router.post(Routes.API_CLIENT_REGISTER, ClientController.register);
router.post(Routes.API_CLIENT_LOGIN, ClientController.login);
router.get(Routes.API_CLIENT_GET_LOGGED, ClientController.getLoggedClient);
router.put(Routes.API_CLIENT_LOGOUT, ClientController.logout);
router.get(Routes.API_CLIENT_GET, Auth.tokenVerify, ClientController.get);
router.put(Routes.API_CLIENT_UPDATE, Auth.tokenVerify, ClientController.update);

// Product routes
router.post(Routes.API_PRODUCT_NEW, Auth.tokenVerify, ProductController.new);
router.get(Routes.API_PRODUCT_GET, Auth.tokenVerify, ProductController.get);
router.put(Routes.API_PRODUCT_UPDATE, Auth.tokenVerify, ProductController.update);

export default router;