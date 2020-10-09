import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LoginPage from './components/Login/LoginPage.js'
import ListPage from './components/List/ListPage.js'
import FormPage from './components/Form/FormPage.js'
import { isAuthenticated } from './auth'

/* Rota Privada: recebe um componente, com todos os seus atributos por props (path, component...). 
Verifica autenticação e redireciona em caso negativo */

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ... rest} render={props => (
        isAuthenticated() ? (
        <Component {...props} />
        ) : (
            <Redirect to={{ pathname:"/", state: { from: props.location } }} />
        )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute path="/list" component={ListPage} />
            <PrivateRoute path="/form" component={FormPage} />
        </Switch>
    </BrowserRouter>
);

export default Routes;