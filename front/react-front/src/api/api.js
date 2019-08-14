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

const getWithToken = (url, additionalHeaders={}) => {
    return get(url, {
        "Authorization": `Token ${cookies.get("auth_token")}`,
    });
};

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

        users.forEach(user => {
           userCache[user.id] = user;
        });

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
    }
    return {
        ok: false,
    };
};

export const fetchAllParties = async (belongsTo) => {
    const result = await get(endpoints.ALL_PARTIES(belongsTo));
    if(result.ok) {
        const parties = await result.json();
        return {
            ok: true,
            parties,
        }
    }
    return {
        ok: false,
    };
};

export const fetchParty = async (partyId) => {
    const result = await get(endpoints.SINGLE_PARTY(partyId));
    if(result.ok) {
        const party = await result.json();
        return {
            ok: true,
            party,
        };
    }
    return {
        ok: false,
    };
};

export const createParty = async () => {
    const result = await postWithToken(endpoints.ALL_PARTIES());
    if(result.ok) {
        const party = await result.json();
        return {
            ok: true,
            party,
        }
    }
    return {
        ok: false,
    };
};

export const fetchCommand = async (commandId) => {
    const result = await get(endpoints.SINGLE_COMMAND(commandId));
    if(result.ok) {
        const command = await result.json();
        return {
            ok: true,
            command,
        };
    }
    return {
        ok: false,
    };
};

export const getMembersOfParty = async (partyId) => {
    const result = await get(endpoints.PARTY_MEMBERS(partyId));
    if(result.ok) {
        const members = await result.json();
        return {
            ok: true,
            members,
        };
    }
    return {
        ok: false,
    };
};

export const addMemberToParty = async (partyId, userId) => {
    const result = await postWithToken(endpoints.PARTY_MEMBERS(partyId),  {
        action: "ADD",
        user: userId,
    });
    if(result.ok) {
        const members = await result.json();
        return {
            ok: true,
            members,
        }
    } else if(result.status === 400) {
        const error = await result.json();
        return {
            ok: true,
            members: error.members,
        };
    }
    return {
        ok: false,
    };
};

export const removeMemberFromParty = async (partyId, userId) => {
    const result = await postWithToken(endpoints.PARTY_MEMBERS(partyId),  {
        action: "REMOVE",
        user: userId,
    });
    if(result.ok) {
        const members = await result.json();
        return {
            ok: true,
            members,
        };
    } else if(result.status === 400) {
        const error = await result.json();
        return {
            ok: true,
            members: error.members,
        };
    }
    return {
        ok: false,
    };
};

export const fetchUserMisc = async (userId) => {
    const result = await get(endpoints.USER_MISC(userId));
    if(result.ok) {
        const misc = await result.json();
        return {
            ok: true,
            misc,
        };
    }
    return {
        ok: false,
    };
};

export const fetchUserFriends = async (userId) => {
    const result = await getWithToken(endpoints.USER_FRIENDS(userId));
    if(result.ok) {
        const friends = await result.json();
        return {
            ok: true,
            ...friends,
        };
    }
    return {
        ok: false,
    }
};

const friendOperation = async (sender, friend, action) => {
    const result = await postWithToken(endpoints.USER_FRIENDS(sender), {
        action: action,
        user: friend,
    });
    if(result.ok) {
        const friends = await result.json();
        return {
            ok: true,
            ...friends
        };
    }
    return {
        ok: false,
    }
};

export const addFriend = (sender, friend) => friendOperation(sender, friend, "ADD");

export const removeFriend = (sender, friend) => friendOperation(sender, friend, "REMOVE");

export const acceptFriend = (sender, friend) => friendOperation(sender, friend, "ACCEPT");

export const refuseFriend = (sender, friend) => friendOperation(sender, friend, "REFUSE");

export const cancelFriend = (sender, friend) => friendOperation(sender, friend, "CANCEL");