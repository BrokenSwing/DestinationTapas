import React from 'react';
import './index.css';
import "bulma";
import App from './App';
import Auth from "./screens/auth/Auth";
import 'aviator'
import {requiresAuth, render} from "./routing";

Aviator.setRoutes({
    '/': requiresAuth(() => render(<App />)),
    '/auth': render(<Auth />)
});

Aviator.dispatch();
Aviator.refresh();

