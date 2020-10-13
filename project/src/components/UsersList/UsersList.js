import React, { Component } from "react";

import { Menu } from 'semantic-ui-react'

import { Redirect } from "react-router-dom";

import axios from 'axios';

import "./list.css";

// Absolute path: não functiona com relative 

import { store } from 'C:/Users/ADMIN/test-2SOW/project/src/state/store.js';
import { sendItemList } from 'C:/Users/ADMIN/test-2SOW/project/src/state/actions.js';

class UsersList extends Component {
    constructor() {
      super();
      this.state = {
        userList: [],
        redirectLogin: false,
        redirectForm: false,
        activeItem: ''
      }

      this.clickDelete = this.clickDelete.bind(this);
      this.clickEdit = this.clickEdit.bind(this);

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

    clickDelete = id => {  
      axios.delete("http://localhost:5000/usuarios/" + id)
        .then(res => console.log(res))
        .catch(error => { console.log(error) }) 
    }

    clickEdit = e => {
      
      this.setState({ redirectForm: true })

      // Passar dados para os inputs. 
      
      store.dispatch(sendItemList(e, true))

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
        const { activeItem, redirectLogin, redirectForm } = this.state

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
            <table id="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Cidade</th>
                </tr>
              </thead>
              <tbody>
              {this.state.userList.map((user, index) => (
                <tr key={index}>
                  <td>{user[index].nome}</td>
                  <td>{user[index].cpf}</td>
                  <td>{user[index].email}</td>
                  <td>{user[index].endereco.cidade}
                  </td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickEdit(user[index])}><i aria-hidden="true" className="edit icon"></i></button></td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickDelete(user[index].id)}><i aria-hidden="true" className="trash alternate outline icon"></i></button></td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
        )
    }
}

export default UsersList;