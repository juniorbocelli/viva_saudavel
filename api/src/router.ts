import { Router } from 'express';

import ClientController from './controllers/ClientController';
import ProductController from './controllers/ProductController';
import CartController from './controllers/CartController';
import AddressController from './controllers/AddressController';
import ShippingController from './controllers/ShippingController';
import CheckoutController from './controllers/CheckoutController';
import CreditCardController from './controllers/CreditCardController';
import InvoiceController from './controllers/InvoiceController';
import Auth from './middlewares/Auth';
import * as Routes from './globals/routes';

const router = Router();

// External APIs routes
router.get(Routes.API_CEP_GET_ADDRESS, AddressController.getByCep);
router.get(Routes.API_SHIPPING_VALUE, ShippingController.getValueByCep)

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
router.patch(Routes.API_CART_REMOVE_ITEM, CartController.removeItem);
router.patch(Routes.API_CART_CHANGE_CLIENT_ID, CartController.changeClientCode);

// Credit cards routes
router.get(Routes.API_CREDIT_CARD_GET, Auth.tokenVerify, CreditCardController.get);
router.get(Routes.API_CREDIT_CARD_GET_BY_FILTER, Auth.tokenVerify, CreditCardController.getByFilter);
router.get(Routes.API_CREDIT_CARD_GET_ALL, Auth.adminVerify, CreditCardController.getAll);
// TODO: Join with filter route
router.get(Routes.API_CREDIT_CARD_GET_ALL_FROM_CLIENT, Auth.tokenVerify, CreditCardController.getAllFromClient);
router.post(Routes.API_CREDIT_CARD_NEW, Auth.tokenVerify, CreditCardController.new);
router.put(Routes.API_CREDIT_CARD_UPDATE, Auth.tokenVerify, CreditCardController.update);
router.patch(Routes.API_CREDIT_CARD_ACTIVATE, Auth.tokenVerify, CreditCardController.activateCard);
router.delete(Routes.API_CREDIT_CARD_REMOVE, Auth.tokenVerify, CreditCardController.remove);

// Checkout routes
router.get(Routes.API_CHECKOUT_GET_DELIVERY_DAY, Auth.tokenVerify, CheckoutController.getDeliveryDate);
router.get(Routes.API_CHECKOUT_GET_ALL, Auth.tokenVerify, CheckoutController.getAllClientWithFilter);
router.post(Routes.API_CHECKOUT_NEW, Auth.tokenVerify, CheckoutController.new);

// Invoice routes
router.get(Routes.API_INVOICE_ADMIN_GET, Auth.adminVerify, InvoiceController.getAdminInvoice);
router.get(Routes.API_INVOICE_CLIENT_GET, Auth.tokenVerify, InvoiceController.getClientInvoice);
router.get(Routes.API_INVOICE_CLIENT_GET_ALL, Auth.tokenVerify, InvoiceController.getAllClientWithFilter);
router.get(Routes.API_INVOICE_ADMIN_GET_ALL, Auth.adminVerify, InvoiceController.getAllAdminWithFilter);

export default router;