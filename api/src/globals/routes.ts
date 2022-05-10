export const API_ROOT = `/api`;

// External APIs
export const API_CEP_GET_ADDRESS = `${API_ROOT}/cep/:cep/address/`; // GET
export const API_SHIPPING_VALUE = `${API_ROOT}/shipping/:cep/`; // GET

// Auth routes
export const API_CLIENT_REGISTER = `${API_ROOT}/client/`;   // POST
export const API_CLIENT_LOGIN = `${API_ROOT}/client/login/`;   // POST
export const API_CLIENT_GET_LOGGED = `${API_ROOT}/client/logged/:token/`;   // GET
export const API_CLIENT_LOGOUT = `${API_ROOT}/client/logout/`;   // PUT

// client routes
export const API_CLIENT_GET = `${API_ROOT}/client/:id/`;    // GET
export const API_CLIENT_UPDATE = `${API_ROOT}/client/:id/`; // PUT
export const API_CLIENT_GET_ALL = `${API_ROOT}/clients/`;  // GET
export const API_CLIENT_GET_BY_FILTER = `${API_ROOT}/clients/filtered/`;  // GET

// Product routes
export const API_PRODUCT_NEW = `${API_ROOT}/product/`;  // POST
export const API_PRODUCT_GET = `${API_ROOT}/product/:id/`;  // GET
export const API_PRODUCT_UPDATE = `${API_ROOT}/product/:id/`;  // PUT
export const API_PRODUCT_GET_ALL = `${API_ROOT}/products/`;  // GET
export const API_PRODUCT_GET_BY_FILTER = `${API_ROOT}/products/filtered/`;  // GET

// Cart routes
export const API_CART_GET = `${API_ROOT}/clients/:id/carts/`;    // GET
export const API_CART_ADD_ITEM = `${API_ROOT}/clients/:id/carts/add-item/`;    // PATH
export const API_CART_REMOVE_ITEM = `${API_ROOT}/clients/:id/carts/remove-item`;   // PATH
export const API_CART_CHANGE_CLIENT_ID = `${API_ROOT}/clients/:id/cart/change-client-id/`;  // PATH
export const API_CART_DELETE = `${API_ROOT}clients/:id/carts/`   // DELETE

// Credit Cards routes
export const API_CREDIT_CARD_NEW = `${API_ROOT}/client/:clientId/credit-card/`;  // POST
export const API_CREDIT_CARD_GET = `${API_ROOT}/client/:clientId/credit-card/:id/`;  // GET
export const API_CREDIT_CARD_UPDATE = `${API_ROOT}/client/:clientId/credit-card/:id/`;  // PUT
export const API_CREDIT_CARD_GET_ALL = `${API_ROOT}/client/:clientId/credit-card/`;  // GET
export const API_CREDIT_CARD_ACTIVATE = `${API_ROOT}/client/:clientId/credit-card/:id/activate/`;  // PATH

// checkout routes
export const API_CHECKOUT_GET_DELIVERY_DAY = `${API_ROOT}/checkout/delivery-day/:weekDay/`; // GET