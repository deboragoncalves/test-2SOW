import React, { Component } from "react";

import { Menu } from 'semantic-ui-react'

import axios from 'axios';

import "./list.css";

class UsersList extends Component {
    constructor() {
      super();
      this.state = {
        userList: []
      }
    }

    /* Chamar get no mounted */

    componentDidMount() {
        this.getElements();
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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

        return (
          <div className="containerTable">
                  <Menu className="menu">
                    <Menu.Item
                        name='users'
                        active={activeItem === 'Users'}
                        onClick={this.handleItemClick}
                    >
                    Users
                  </Menu.Item>
                    <Menu.Item
                        name='lista'
                        active={activeItem === 'Lista'}
                        onClick={this.handleItemClick}
                    >
                    Lista
                  </Menu.Item>
                  <Menu.Item
                        name='editar'
                        active={activeItem === 'Editar'}
                        onClick={this.handleItemClick}
                    >
                    Editar Usuário
                  </Menu.Item>
                  <Menu.Item
                        name='sair'
                        active={activeItem === 'Sair'}
                        onClick={this.handleItemClick}
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