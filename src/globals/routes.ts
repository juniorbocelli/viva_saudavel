export const APP_ROOT = '';
export const API_ROOT = 'api';

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


/**
 * NOT LOGGED IN SCREENS ROUTES
 */
 export const SCREEN_LOGIN = `${APP_ROOT}/admin/login/`;

/**
 * APIs
 */

// Auth APIs
export const API_LOGIN = `${API_ROOT}`;
export const API_LOGOUT = `${API_ROOT}`;
export const API_PERMISSIONS = `${API_ROOT}`;