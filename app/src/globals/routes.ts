export const APP_ROOT = '';
export const API_ROOT = 'api';
export const ADMIN_PREFIX = 'admin'

/**
 * NOT LOGGED IN CLIENT SCREENS ROUTES
 */
export const SCREEN_INDEX = `${APP_ROOT}/`;
export const SCREEN_CATEGORY = `${APP_ROOT}/produtos/:category/`;
export const SCREEN_PRODUCER = `${APP_ROOT}/marca/:producer/`;
export const SCREEN_FILTER = `${APP_ROOT}/filtro/:filter/`;

export const SCREEN_PRODUCER_SELECT = `${APP_ROOT}/marca/`;
export const SCREEN_FILTER_SELECT = `${APP_ROOT}/filtro/`;

export const SCREEN_CLIENT_LOGIN = `${APP_ROOT}/login/`;
export const SCREEN_CLIENT_REGISTER = `${APP_ROOT}/cadastro/`;


/**
 * NOT LOGGED IN ADMIN SCREENS ROUTES
 */
export const SCREEN_ADMIN_LOGIN = `${APP_ROOT}/${ADMIN_PREFIX}/login/`;

/**
 * LOGGED IN ADMIN SCREENS ROUTER
 */
export const SCREEN_ADMIN_INDEX = `${APP_ROOT}/${ADMIN_PREFIX}/`;
export const SCREEN_ADMIN_PRODUCTS = `${APP_ROOT}/${ADMIN_PREFIX}/produtos/`;
export const SCREEN_ADMIN_PRODUCT_CREATE = `${APP_ROOT}/${ADMIN_PREFIX}/produto/`;
export const SCREEN_ADMIN_PRODUCT_EDIT = `${APP_ROOT}/${ADMIN_PREFIX}/produto/:id/`;

export const SCREEN_ADMIN_CLIENTS = `${APP_ROOT}/${ADMIN_PREFIX}/clientes/`;

export const SCREEN_CLIENT_GET = `${APP_ROOT}/meus-dados/`;
export const SCREEN_CLIENT_CHECKOUT = `${APP_ROOT}/finalizar-compra/`;

/**
 * APIs
 */

// External APIs
export const API_CEP_GET_ADDRESS = `${API_ROOT}/cep/:cep/address/`; // GET
export const API_SHIPPING_VALUE = `${API_ROOT}/shipping/:cep/`; // GET

// Auth APIs
export const API_CLIENT_REGISTER = `${API_ROOT}/client/`;
export const API_CLIENT_LOGIN = `${API_ROOT}/client/login/`;
export const API_CLIENT_LOGGED = `${API_ROOT}/client/logged/:token/`;
export const API_CLIENT_LOGOUT = `${API_ROOT}/client/logout/`;

export const API_CLIENT_GET = `${API_ROOT}/client/:id/`;    // GET
export const API_CLIENT_UPDATE = `${API_ROOT}/client/:id/`; // PUT
export const API_CLIENT_GET_ALL = `${API_ROOT}/clients/`;  // GET
export const API_CLIENT_GET_BY_FILTER = `${API_ROOT}/clients/filtered/`;  // GET

export const API_PRODUCT_NEW = `${API_ROOT}/product/`;  // POST
export const API_PRODUCT_GET = `${API_ROOT}/product/:id/`;  // GET
export const API_PRODUCT_UPDATE = `${API_ROOT}/product/:id/`;  // PUT
export const API_PRODUCT_GET_ALL = `${API_ROOT}/products/`;  // GET
export const API_PRODUCT_GET_BY_FILTER = `${API_ROOT}/products/filtered/`;  // GET

export const API_CART_GET = `${API_ROOT}/clients/:id/carts/`;    // GET
export const API_CART_ADD_ITEM = `${API_ROOT}/clients/:id/carts/add-item/`;    // PATH
export const API_CART_REMOVE_ITEM = `${API_ROOT}/clients/:id/carts/remove-item`;   // PATH
export const API_CART_CHANGE_CLIENT_ID = `${API_ROOT}/clients/:id/cart/change-client-id/`;  // PATH
export const API_CART_DELETE = `${API_ROOT}clients/:id/carts/`   // DELETE

export const API_CLIENT_CHECKOUT = ``;
export const API_CHECKOUT_GET_DELIVERY_DAY = `${API_ROOT}/checkout/delivery-day/:weekDay/`; // GET