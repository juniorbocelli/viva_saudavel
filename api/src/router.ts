import { Router } from 'express';

import ClientController from './controllers/ClientController';
import ProductController from './controllers/ProductController';
import CartController from './controllers/CartController';
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

router.get(Routes.API_CLIENT_GET_ALL, Auth.adminVerify, ClientController.getAll);
router.get(Routes.API_CLIENT_GET_BY_FILTER, Auth.adminVerify, ClientController.getAll);

// Product routes
router.get(Routes.API_PRODUCT_GET, ProductController.get);
router.get(Routes.API_PRODUCT_GET_ALL, ProductController.getAll);
router.get(Routes.API_PRODUCT_GET_BY_FILTER, ProductController.getByFilter);

router.post(Routes.API_PRODUCT_NEW, Auth.adminVerify, ProductController.new);
router.put(Routes.API_PRODUCT_UPDATE, Auth.adminVerify, ProductController.update);

router.get(Routes.API_CART_GET, CartController.get);
router.patch(Routes.API_CART_ADD_ITEM, CartController.addItem);

export default router;