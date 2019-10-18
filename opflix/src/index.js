import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';


import * as serviceWorker from './serviceWorker';

import {Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

// const RotaPrivada = ({component: Component, ...rest}) => (
//     <Route
//         {...rest}
//         render={props => 
//             localStorage.getItem("Token") !== null ? 
//                 <Component {...props}/> 
//                 :
//                 <Redirect
//                     to={{ pathname: '/login', state: {from: props.location} }}
//                 />

//         }
//     >
//     </Route>
// )

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Admin}/>
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
