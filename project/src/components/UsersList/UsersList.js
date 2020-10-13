import React, { Component } from "react";

import { Menu, Input } from 'semantic-ui-react'

import { Redirect } from "react-router-dom";

import axios from 'axios';

import "./list.css";

// Absolute path: não functiona com relative 

import { usuarios } from 'C:/Users/ADMIN/test-2SOW/project/src/data/db.json'

import { store } from 'C:/Users/ADMIN/test-2SOW/project/src/state/store.js';
import { sendItemList } from 'C:/Users/ADMIN/test-2SOW/project/src/state/actions.js';

class UsersList extends Component {
    constructor() {
      super();
      this.state = {
        searchName: '',
        redirectLogin: false,
        redirectForm: false,
        activeItem: ''
      }

      this.clickDelete = this.clickDelete.bind(this);
      this.clickEdit = this.clickEdit.bind(this);

    }

    changeSearchName = e => {
      this.setState({ searchName: e.target.value })

      // Get pelo nome

      axios.get("http://localhost:5000/usuarios/?q=" + this.state.searchName)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
    
    clickNewUser = (e, { name }) => {
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
                        name='newUser'
                        active={activeItem === 'newUser'}
                        onClick={this.clickNewUser}
                    >
                    Novo Usuário
                  </Menu.Item>
                  <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.clickLogout}
                    >
                    Sair
                  </Menu.Item>
              </Menu>
            <Input placeholder="Buscar pelo nome..." className="inputStyle" type="text" value={this.state.searchName} onChange={this.changeSearchName} />
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
              {usuarios.map((user, index) => this.state.searchName === user.nome ? (
                <tr key={index}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.endereco.cidade}</td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickEdit(user)}><i aria-hidden="true" className="edit icon"></i></button></td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickDelete(user.id)}><i aria-hidden="true" className="trash alternate outline icon"></i></button></td>
                </tr> 
              ) : 
              this.state.searchName === '' ?
              <tr key={index}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.email}</td>
                  <td>{user.endereco.cidade}</td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickEdit(user)}><i aria-hidden="true" className="edit icon"></i></button></td>
                  <td className="buttonRow"><button className="ui circular icon button" onClick={() => this.clickDelete(user.id)}><i aria-hidden="true" className="trash alternate outline icon"></i></button></td>
              </tr> : null )}

              </tbody>
            </table>
            </div>
        )
    }
}

export default UsersList;