import React, { Component } from "react";

import { Menu } from 'semantic-ui-react'

import { Redirect } from "react-router-dom";

import axios from 'axios';

import "./list.css";

class UsersList extends Component {
    constructor() {
      super();
      this.state = {
        userList: [],
        redirectLogin: false,
        redirectForm: false,
        activeItem: ''
      }
    }

    /* Chamar get no mounted */

    componentDidMount() {
        this.getElements();
    }

    clickEditUser = (e, { name }) => {
      this.setState({ activeItem: name, redirectForm: true })
    }

    clickLogout = (e, { name }) => {
      this.setState({ activeItem: name, redirectLogin: true })
    }

    /* Get elementos json */

    getElements() {
        axios.get("http://localhost:5000/usuarios")
            .then(res => {

              this.state.userList.push(res.data)

              this.setState({ ...this.state.userList })

              console.log(res)
            })
            .catch(error => { console.log(error) })
    }

    render() {
        const { activeItem } = this.state

        const { redirectForm } = this.state;
        const { redirectLogin } = this.state;

        // Se for redirect true, redirecionar

        if (redirectForm) {
            return <Redirect to='/form'/>;
        }  

        if (redirectLogin) {
            localStorage.clear()
            return <Redirect to='/'/>;
        } 

        return (
          <div className="containerTable">
                  <Menu className="menu">
                    <Menu.Item
                        name='users'>
                    Users
                  </Menu.Item>
                    <Menu.Item
                        name='list'
                    >
                    Lista
                  </Menu.Item>
                  <Menu.Item
                        name='editUser'
                        active={activeItem === 'editUser'}
                        onClick={this.clickEditUser}
                    >
                    Editar Usuário
                  </Menu.Item>
                  <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.clickLogout}
                    >
                    Sair
                  </Menu.Item>
              </Menu>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Cidade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><ul>
                   {this.state.userList.map(function(item, index) {

                    for (var i = 0; i < item.length; i++) {

                     return (
                          <ul key={index}>
                            <li>
                              <p>{item[i].nome}</p>
                            </li>
                          </ul>
                      )}        
                   })}
                  </ul></td>
                  <td><ul>
                   {this.state.userList.map(function(item, index) {

                    for (var i = 0; i < item.length; i++) {

                     return (
                          <ul key={index}>
                            <li>
                              <p>{item[i].cpf}</p>
                            </li>
                          </ul>
                      )}        
                   })}
                  </ul></td>
                  <td><ul>
                   {this.state.userList.map(function(item, index) {

                    for (var i = 0; i < item.length; i++) {

                     return (
                          <ul key={index}>
                            <li>
                              <p>{item[i].email}</p>
                            </li>
                          </ul>
                      )}        
                   })}
                  </ul></td>
                  <td><ul>
                   {this.state.userList.map(function(item, index) {

                    for (var i = 0; i < item.length; i++) {

                     return (
                          <ul key={index}>
                            <li>
                              <p>{item[i].endereco.cidade}</p>
                            </li>
                          </ul>
                      )}        
                   })}
                  </ul></td>
                  </tr>
              </tbody>
            </table>
            </div>
        )
    }
}

export default UsersList;