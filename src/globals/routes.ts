export const APP_ROOT = '';
export const API_ROOT = 'api';

/**
 * NOT LOGGED IN CLIENT SCREENS ROUTES
 */
export const SCREEN_INDEX = `${APP_ROOT}/`;
export const SCREEN_CATEGORY = `${APP_ROOT}/produtos/:category`;


/**
 * NOT LOGGED IN SCREENS ROUTES
 */
export const SCREEN_LOGIN = `${APP_ROOT}/login/`;


/**
 * APIs
 */

// Auth APIs
export const API_LOGIN = `${API_ROOT}`;
export const API_LOGOUT = `${API_ROOT}`;
export const API_PERMISSIONS = `${API_ROOT}`;