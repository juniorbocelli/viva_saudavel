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
export const SCREEN_ADMIN_PRODUCTS_CREATE = `${APP_ROOT}/${ADMIN_PREFIX}/produto/`;
export const SCREEN_ADMIN_PRODUCTS_EDIT = `${APP_ROOT}/${ADMIN_PREFIX}/produto/:id/`;

/**
 * APIs
 */

// Auth APIs
export const API_CLIENT_REGISTER = `${API_ROOT}/client/`;
export const API_CLIENT_LOGIN = `${API_ROOT}/client/login/`;
export const API_CLIENT_LOGGED = `${API_ROOT}/client/logged/:token/`;
export const API_LOGOUT = `${API_ROOT}`;