const BASE_PATH = "/api/";

export const FETCH_TOKEN = BASE_PATH + "auth/";
export const ALL_USERS = BASE_PATH + "users/";
export const SINGLE_USER = (id) => `${BASE_PATH}/users/${id}/`;
export const ALL_PRODUCTS = BASE_PATH + "products/";