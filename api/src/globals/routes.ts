export const API_ROOT = `/api`;

// Post routes
// export const API_POST_LIST = `${API_ROOT}/`;
// export const API_POST_NEW = `${API_ROOT}/`;
// export const API_POST_GET = `${API_ROOT}/:id`;
// export const API_POST_UPDATE = `${API_ROOT}/:id`;
// export const API_POST_DELETE = `${API_ROOT}/:id`;
// export const API_POST_LIKE = `${API_ROOT}/:id/like/`;

// Client routes
export const API_CLIENT_REGISTER = `${API_ROOT}/client/`;   // POST
export const API_CLIENT_LOGIN = `${API_ROOT}/client/login/`;   // POST
export const API_CLIENT_GET_LOGGED = `${API_ROOT}/client/logged/:token/`;   // GET
export const API_CLIENT_LOGOUT = `${API_ROOT}/client/logout/`;   // PUT
export const API_CLIENT_GET = `${API_ROOT}/client/:id/`;    // GET
export const API_CLIENT_UPDATE = `${API_ROOT}/client/:id/`; // PUT

// Product routes
export const API_PRODUCT_NEW = `${API_ROOT}/product/`;  // POST
export const API_PRODUCT_GET = `${API_ROOT}/product/:id/`;  // GET