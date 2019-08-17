import {get, getWithToken, postWithToken} from "../methods";
import * as endpoints from "../endpoints";

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