import * as endpoints from "../endpoints";
import {get, postWithToken} from "../methods";

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

export const finishParty = async (partyId) => {
    const result = await postWithToken(endpoints.SINGLE_PARTY(partyId));
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

/////////////////////////////////////////////////////
////////////////////// Members //////////////////////
/////////////////////////////////////////////////////

export const fetchPartyMembers = async (partyId) => {
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
