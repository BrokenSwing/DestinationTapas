import React from 'react';
import "./style.sass";
import App from './App';
import Auth from "./screens/auth/Auth";
import Products from "./screens/products/Products";
import Parties from "./screens/party/Parties";
import PartyDetails from "./screens/party/details/PartyDetails";
import MembersUpdate from "./screens/party/members/MembersUpdate";
import Profile from "./screens/profile/Profile";
import 'aviator'
import {requiresAuth, renderLater, render, isConnected} from "./routing";

Aviator.setRoutes({
    '/': requiresAuth(renderLater(<App />)),
    '/auth': (request) => {
        if(isConnected()) {
            if(request.queryParams.redirect) {
                Aviator.navigate(request.queryParams.redirect)
            } else {
                Aviator.navigate("/");
            }
        } else {
            render(<Auth />);
        }
    },
    '/products': renderLater(<Products/>),
    '/parties': {
        '/': requiresAuth(renderLater(<Parties />)),
        '/:id': {
            "/": requiresAuth(renderLater(<PartyDetails />)),
            "/members": requiresAuth(renderLater(<MembersUpdate />))
        }
    },
    '/profile': requiresAuth(renderLater(<Profile />))
});

Aviator.dispatch();
Aviator.refresh();

