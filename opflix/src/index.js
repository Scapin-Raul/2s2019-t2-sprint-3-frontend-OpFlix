import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Cadastro from './pages/Cadastro/Cadastro';
import Localizacoes from './pages/Localizacoes/Localizacoes';
import { parseJwt } from '../src/services/auth';

import * as serviceWorker from './serviceWorker';

import {Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

const RotaPrivada = ({component: Component}) => (
    <Route
        render={
            props => 
                localStorage.getItem('usuario-token') != null?(
                    parseJwt().sub === "True"? (
                        <Admin/>
                        ) : (
                        <App {...props}/> 
                        )
                    ) : (   
                    <App {...props}/> 
                )
        }
    >
    </Route>
)

const RotaLogin = ({component: Component}) =>(
    <Route
        render={
            props=>
                localStorage.getItem('usuario-token') != null?
                <App/>
                :
                <Login/> 
        }
    >

    </Route>
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/cadastro" component={Cadastro}/>
                <Route path="/localizacoes" component={Localizacoes}/>
                <RotaLogin path="/login" component={Login}/>
                <RotaPrivada path="/admin" component={App}/>
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
