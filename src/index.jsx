import React, { Fragment,useState,useEffect } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import {firebase_app, auth0} from './data/config';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
import App from './components/app'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {ToastContainer} from 'react-toastify';
import {routes} from './route';
import ConfigDB  from './data/customizer/config'
import {configureFakeBackend ,handleResponse} from './services/fack.backend'
// import {authHeader} from './services/auth'
// Signin page
import Signin from './auth/signin'


// Maintenanc
import Maintenance from "./pages/maintenance"

import Login from "../src/components/new/Login"
import Callback from './auth/callback'



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
,document.getElementById('root'));

