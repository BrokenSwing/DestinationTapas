import React from 'react';
import './index.css';
import "bulma";
import App from './App';
import Auth from "./screens/auth/Auth";
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
            render(<Auth />)
        }
    },
});

Aviator.dispatch();
Aviator.refresh();

