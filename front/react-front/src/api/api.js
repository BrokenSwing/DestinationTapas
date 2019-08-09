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

export const fetchAllUsers = async () => {
    const result = await get(endpoints.ALL_USERS);
    if(result.ok) {
        const users = await  result.json();
        return {
            ok: true,
            ...users,
        };
    } else {
        return {
            ok: false,
        };
    }
};

export const fetchUserData = async (userId) => {
    const result = await get(endpoints.SINGLE_USER(userId));
    if(result.ok) {
        const jsonBody = await result.json();
        return {
            ok: true,
            ...jsonBody,
        }
    } else {
        return {
            ok: false,
        };
    }
};