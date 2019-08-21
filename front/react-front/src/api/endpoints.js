const BASE_PATH = "/api";

export const FETCH_TOKEN = `${BASE_PATH}/auth/`;
export const ALL_USERS = `${BASE_PATH}/users/`;
export const SINGLE_USER = (id) => `${BASE_PATH}/users/${id}/`;
export const ALL_PRODUCTS = `${BASE_PATH}/products/`;
export const SINGLE_PRODUCT = (id) => `${BASE_PATH}/products/${id}/`;
export const SINGLE_PARTY = (id) => `${BASE_PATH}/parties/${id}/`;
export const ALL_PARTIES = (userId) => `${BASE_PATH}/parties/${userId !== null && userId !== undefined ? `?for=${userId}` : ''}`;
export const PARTY_MEMBERS = (partyId) => `${BASE_PATH}/parties/${partyId}/members/`;
export const SINGLE_COMMAND = (id) => `${BASE_PATH}/commands/${id}/`;
export const PARTY_COMMANDS = (partyId) => `${BASE_PATH}/parties/${partyId}/commands/`;
export const USER_MISC = (userId) => `${BASE_PATH}/users/${userId}/misc/`;
export const USER_FRIENDS = (userId) => `${BASE_PATH}/users/${userId}/friends/`;
