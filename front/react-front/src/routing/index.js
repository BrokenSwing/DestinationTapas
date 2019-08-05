import "aviator";
import { Cookies } from "react-cookie";
import React from "react";
import ReactDOM from 'react-dom';

export const requiresAuth = (onAuthFunction) => {
    return () => {
        const cookies = new Cookies();
        console.log(`Trying to access page with auth required with auth token : ${cookies.get("auth_token")}`);
        if(cookies.get("auth_token")) {
            onAuthFunction();
        } else {
            Aviator.navigate("/auth", { queryParams: { redirect: Aviator.getCurrentURI()}});
        }
    };
};

export const render = (component) => {
    ReactDOM.render(component, document.getElementById("root"))
};

export const isConnected = () => {
    const cookies = new Cookies();
    return cookies.get("auth_token") !== undefined;
};