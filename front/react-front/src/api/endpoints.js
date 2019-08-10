const BASE_PATH = "/api";

export const FETCH_TOKEN = `${BASE_PATH}/auth/`;
export const ALL_USERS = `${BASE_PATH}/users/`;
export const SINGLE_USER = (id) => `${BASE_PATH}/users/${id}/`;
export const ALL_PRODUCTS = `${BASE_PATH}/products/`;
export const ALL_PARTIES = `${BASE_PATH}/parties/`;
export const SINGLE_PARTY = (id) => `${BASE_PATH}/parties/${id}/`;
export const SINGLE_COMMAND = (id) => `${BASE_PATH}/commands/${id}/`;