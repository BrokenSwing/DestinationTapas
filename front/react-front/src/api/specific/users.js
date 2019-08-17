import {get, post} from "../methods";
import * as endpoints from "../endpoints";

export const fetchToken = async (username, password) => {
    const result = await post(endpoints.FETCH_TOKEN, {
        username,
        password,
    });
    if(result.ok) {
        const auth_info = await result.json();
        return {
            ok: true,
            ...auth_info,
        };
    }
    return {
        ok: false,
    };
};

const userCache = {};

export const fetchAllUsers = async () => {
    const result = await get(endpoints.ALL_USERS);
    if(result.ok) {
        const users = await result.json();

        // Caching users
        users.forEach(user => userCache[user.id] = user);

        return {
            ok: true,
            users,
        };
    }
    return {
        ok: false,
    };
};

export const findUserIdFromName = async (userName) => {
    let matching = Object.keys(userCache).filter(id => userCache[id].username.toLowerCase() === userName.toLowerCase());
    if(matching.length > 0) {
        return {
            ok: true,
            id: matching[0],
        };
    }
    const result = await fetchAllUsers();
    if(result.ok) {
        matching = result.users.filter(user => user.username.toLowerCase() === userName.toLowerCase());
        if(matching.length > 0) {
            return {
                ok: true,
                id: matching[0].id,
            };
        }
    }
    return {
        ok: false,
    };
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
        // Caching user
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