export const API_ROOT = `/api`;

// External APIs
export const API_CEP_GET_ADDRESS = `${API_ROOT}/cep/:cep/address/`; // GET
export const API_SHIPPING_VALUE = `${API_ROOT}/shipping/:cep/`; // GET

// Auth routes
export const API_CLIENT_REGISTER = `${API_ROOT}/client/`;   // POST
export const API_CLIENT_LOGIN = `${API_ROOT}/client/login/`;   // POST
export const API_CLIENT_GET_LOGGED = `${API_ROOT}/client/logged/:token/`;   // GET
export const API_CLIENT_LOGOUT = `${API_ROOT}/client/logout/`;   // PUT

// Client routes
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
export const API_CART_GET = `${API_ROOT}/client/:id/cart/`;    // GET
export const API_CART_ADD_ITEM = `${API_ROOT}/client/:id/cart/add-item/`;    // PATH
export const API_CART_REMOVE_ITEM = `${API_ROOT}/client/:id/cart/remove-item/`;   // PATH
export const API_CART_CHANGE_CLIENT_ID = `${API_ROOT}/client/:id/cart/change-client-id/`;  // PATH
export const API_CART_DELETE = `${API_ROOT}client/:id/cart/`   // DELETE
export const API_CART_EMPTY = `${API_ROOT}/client/:id/cart/empty/`;    // PATH

// Credit Cards routes
export const API_CREDIT_CARD_NEW = `${API_ROOT}/client/:clientId/credit-card/`;  // POST
export const API_CREDIT_CARD_GET = `${API_ROOT}/client/:clientId/credit-card/:id/`;  // GET
export const API_CREDIT_CARD_GET_BY_FILTER = `${API_ROOT}/client/:clientId/filtered/credit-card/`;  // GET
export const API_CREDIT_CARD_UPDATE = `${API_ROOT}/client/:clientId/credit-card/:id/`;  // PUT
export const API_CREDIT_CARD_GET_ALL = `${API_ROOT}/admin/credit-card/`;  // GET
export const API_CREDIT_CARD_GET_ALL_FROM_CLIENT = `${API_ROOT}/client/:clientId/credit-card/`;  // GET
export const API_CREDIT_CARD_ACTIVATE = `${API_ROOT}/client/:clientId/credit-card/:id/activate/`;  // PATH
export const API_CREDIT_CARD_REMOVE = `${API_ROOT}/client/:clientId/credit-card/:id/`;  // DELETE

// Checkout routes
export const API_CHECKOUT_GET_DELIVERY_DAY = `${API_ROOT}/checkout/delivery-day/:weekDay/`; // GET
export const API_CHECKOUT_ADMIN_GET_ALL = `${API_ROOT}/checkout/`; // GET
export const API_CHECKOUT_CLIENT_GET_ALL = `${API_ROOT}/client/:clientId/checkout/`; // GET
export const API_CHECKOUT_ADMIN_GET = `${API_ROOT}/checkout/:id/`; // GET
export const API_CHECKOUT_CLIENT_GET = `${API_ROOT}/client/:clientId/checkout/:id/`; // GET
export const API_CHECKOUT_NEW = `${API_ROOT}/client/:clientId/checkout/`; // POST
export const API_CHECKOUT_CLIENT_GET_NEXT_DELIVERY_DATE = `${API_ROOT}/client/:clientId/checkout/:id/delivery-date/`; // GET
export const API_CHECKOUT_ADMIN_GET_NEXT_DELIVERY_DATE = `${API_ROOT}/client/:clientId/checkout/:id/delivery-date/`;    // GET
export const API_CHECKOUT_CLIENT_HANDLE_ACTIVE = `${API_ROOT}/client/:clientId/checkout/:id/handle-activate/`;    // PATH
export const API_CHECKOUT_ADMIN_HANDLE_ACTIVE = `${API_ROOT}/client/:clientId/checkout/:id/handle-activate/`; // PATH

// Invoice routes
export const API_INVOICE_CLIENT_GET = `${API_ROOT}/client/:clientId/invoice/:id/`; // GET
export const API_INVOICE_ADMIN_GET = `${API_ROOT}/admin/invoice/:id/`; // GET
export const API_INVOICE_CLIENT_GET_ALL = `${API_ROOT}/client/:clientId/invoice/`; // GET
export const API_INVOICE_ADMIN_GET_ALL = `${API_ROOT}/admin/invoice/`; // GET