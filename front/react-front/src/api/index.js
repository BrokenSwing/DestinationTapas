export * from "./specific/commands";
export * from "./specific/friends";
export * from "./specific/parties";
export * from "./specific/products";
export * from "./specific/users";

export const getConnectedUser = () => {
    const id = localStorage.getItem("userId");
    if (id !== undefined) {
        return Number(id);
    }
    return null;
};