import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login/Login.js'
import UsersList from './components/UsersList/UsersList.js'
import NewUser from './components/NewUser/NewUser.js'

/* Rota Privada: recebe um componente, com todos os seus atributos por props (path, component...). 
Verifica autenticação (existe token no localStorage) e redireciona em caso negativo */

const PrivateRoute = props => {
    const isLogged = localStorage.getItem('token')
    return isLogged ? <Route { ... props} /> : <Redirect to="/" />
}

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/list" component={UsersList} />
            <PrivateRoute path="/form" component={NewUser} />
        </Switch>
    </BrowserRouter>
);

export default Routes;