import {Cookies} from "react-cookie";

const cookies = new Cookies();

export const post = (url, jsonBody, additionalHeaders={}) => {
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

export const get = (url, additionalHeaders={}) => {
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

export const postWithToken = (url, jsonBody, additionalHeaders={}) => {
  return post(url, jsonBody, {
     "Authorization": `Token ${cookies.get("auth_token")}`,
  });
};

export const getWithToken = (url, additionalHeaders={}) => {
    return get(url, {
        "Authorization": `Token ${cookies.get("auth_token")}`,
    });
};