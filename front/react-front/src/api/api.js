import * as endpoints from "./endpoints";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const post = (url, jsonBody, additionalHeaders={}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get("csrftoken"),
            ...additionalHeaders,
        },
        body: JSON.stringify(jsonBody),
    });
};

const get = (url, additionalHeaders={}) => {
    return fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get("csrftoken"),
            ...additionalHeaders,
        },
    });
};

const postWithToken = (url, jsonBody, additionalHeaders={}) => {
  return post(url, jsonBody, {
     "Authorization": `Token ${cookies.get("auth_token")}`,
  });
};

export const fetchToken = async (username, password) => {
    const result = await post(endpoints.FETCH_TOKEN, {
        username,
        password,
    });
    console.log(result.status);
    if(result.ok) {
        const auth_info = await result.json();
        return {
            ok: true,
            ...auth_info,
        };
    } else {
        return {
            ok: false,
        };
    }
};

const userCache = {};

export const fetchAllUsers = async () => {
    const result = await get(endpoints.ALL_USERS);
    if(result.ok) {
        const users = await result.json();

        users.forEach(user => {
           userCache[user.id] = user;
        });

        return {
            ok: true,
            users,
        };
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchUser = async (userId) => {
    if(userCache[userId]) {
        return {
            ok: true,
            user: userCache[userId],
        };
    }

    const result = await get(endpoints.SINGLE_USER(userId));
    if(result.ok) {
        const user = await result.json();
        userCache[userId] = user;
        return {
            ok: true,
            user,
        };
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchAllProducts = async () => {
    const result = await get(endpoints.ALL_PRODUCTS);
    if(result.ok) {
        const products = await result.json();
        return {
            ok: true,
            products,
        };
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchAllParties = async (belongsTo) => {
    const result = await get(endpoints.ALL_PARTIES(belongsTo));
    if(result.ok) {
        const parties = await result.json();
        return {
            ok: true,
            parties,
        }
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchParty = async (partyId) => {
    const result = await get(endpoints.SINGLE_PARTY(partyId));
    if(result.ok) {
        const party = await result.json();
        return {
            ok: true,
            party,
        };
    } else {
        return {
            ok: false
        }
    }
};

export const createParty = async () => {
    const result = await postWithToken(endpoints.ALL_PARTIES());
    if(result.ok) {
        const party = await result.json();
        return {
            ok: true,
            party,
        }
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchCommand = async (commandId) => {
    const result = await get(endpoints.SINGLE_COMMAND(commandId));
    if(result.ok) {
        const command = await result.json();
        return {
            ok: true,
            command,
        };
    } else {
        return {
            ok: false,
        };
    }
};

export const addMemberToParty = async (partyId, userId) => {
    const result = await postWithToken(endpoints.PARTY_MEMBERS(partyId),  {
        action: "ADD",
        user: userId,
    });
    if(result.ok) {
        const members = await result.json();
    } else {
        return {
            ok: false,
        };
    }
};