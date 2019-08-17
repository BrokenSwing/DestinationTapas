import {get} from "../methods";
import * as endpoints from "../endpoints";

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