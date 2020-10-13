import React, { Component } from "react";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

import InputMask from 'react-input-mask'

import { Redirect } from "react-router-dom";

import { Menu } from 'semantic-ui-react'

// Absolute path: não functiona com relative 

import { store } from 'C:/Users/ADMIN/test-2SOW/project/src/state/store.js';

import "./newUser.css";

const ToastEmail = () => {
    return (
        <div>O campo "Email" deve estar em formato de Email (@, .com).</div>
    )
}

class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            redirectLogin: false,
            redirectList: false,
            activeItem: '',
            data: {
                id: "",
                nome: "",
                cpf: "",
                email: "",
                endereco: {
                    cep: "",
                    rua: "",
                    numero: "",
                    bairro: "",
                    cidade: ""
                }
            }
        }
    }

    componentDidMount() {
        console.log(store.getState().item)
        console.log(store.getState().redirectForm)

        // Se botão foi clicado, setar state e preencher inputs 

        if (store.getState().redirectForm) {

            var data = {...this.state.data}

            data.id = store.getState().item.id;
            data.nome = store.getState().item.nome;
            data.cpf = store.getState().item.cpf;
            data.email = store.getState().item.email;
            data.endereco.cep = store.getState().item.endereco.cep;
            data.endereco.rua = store.getState().item.endereco.rua;
            data.endereco.numero = store.getState().item.endereco.numero;
            data.endereco.bairro = store.getState().item.endereco.bairro;
            data.endereco.cidade = store.getState().item.endereco.cidade;

            this.setState({ data })
        }
    }

    clickList = (e, { name }) => {
        this.setState({ activeItem: name, redirectList: true })
      }
  
    clickLogout = (e, { name }) => {
        this.setState({ activeItem: name, redirectLogin: true })
    }

    changeName = e => {
        var data = {...this.state.data}
        data.nome = e.target.value;
        this.setState({ data })
    }

    changeCpf = e => {
        var data = {...this.state.data}
        data.cpf = e.target.value;
        this.setState({ data })
    }

    changeEmail = e => {
        var data = {...this.state.data}
        data.email = e.target.value;
        this.setState({ data })
    }

    changeCep = e => {
        var data = {...this.state.data}
        data.endereco.cep = e.target.value;
        this.setState({ data })
    }

    changeStreet = e => {
        var data = {...this.state.data}
        data.endereco.rua = e.target.value;
        this.setState({ data })
    }

    changeNumber = e => {
        var data = {...this.state.data}
        data.endereco.numero = e.target.value;
        this.setState({ data })
    }

    changeDistrict = e => {
        var data = {...this.state.data}
        data.endereco.bairro = e.target.value;
        this.setState({ data })
    }

    changeCity = e => {
        var data = {...this.state.data}
        data.endereco.cidade = e.target.value;
        this.setState({ data })
    }

    onBlurCep = e => {
        
        // Validar CEP

        if (e.target.value?.length !== 8) {
            return;
        } else {

        var data = {...this.state.data}
        data.endereco.cep = e.target.value;
        this.setState({ data })

            // Autocomplete CEP - ViaCep quando sair do input

            axios.get('https://viacep.com.br/ws/' + e.target.value + '/json/')
                .then(res => {

                    // Setar state de acordo com os dados do json (viacep)

                    var data = {...this.state.data}
                    data.endereco.rua = res.data.logradouro;
                    data.endereco.bairro = res.data.bairro;
                    data.endereco.cidade = res.data.localidade;
                    this.setState({ data })
        
                })
                .catch(error => { console.log(error)} )
                }
    }

    validateForm = () => {

        // Cast para int e atribuir valor ao id

        var data = {...this.state.data}

        var idInteger = Math.random() 
        data.id = idInteger
        parseInt(data.id)
        this.setState({ data })

        // Cast para int e setar state

        var cepInteger = parseInt(data.endereco.cep)
        var numInteger = parseInt(data.endereco.numero)

        data.endereco.cep = cepInteger
        data.endereco.numero = numInteger
        this.setState({ data })

        // Validação

        if (!data.email.includes("@") || !data.email.includes(".com")) {
            toast.warning(<ToastEmail />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (data.id.length === 0) {
            return false;
        }

        return true;
    }

    submitForm = e => {
        e.preventDefault()
        e.persist();

        const isValid = this.validateForm();

        if (isValid) {

            // Se o botão Editar foi clicado, fazer o put. Se não, post.

            if (store.getState().redirectForm) {
                axios.put("http://localhost:5000/usuarios/" + this.state.data.id, this.state.data)
                    .then(res => {
                        // Redirecionar para lista

                        this.setState({ redirectList: true })

                        console.log(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                axios.post("http://localhost:5000/usuarios", this.state.data)
                .then(res => {

                    // Redirecionar para lista

                    this.setState({ redirectList: true })

                    console.log(res)
                })
                .catch(error => { 
                    console.log(error) 
                })
            }

            // Limpar formulário

            this.setState({
                redirectLogin: false,
                activeItem: '',
                data: {
                    id: "",
                    nome: "",
                    cpf: "",
                    email: "",
                    endereco: {
                        cep: "",
                        rua: "",
                        numero: "",
                        bairro: "",
                        cidade: ""
                    }
                }
                
            })
        }  
    }

    render() {
        const { activeItem, redirectList, redirectLogin } = this.state;

        // Se for redirect true, redirecionar

        if (redirectList) {
          return <Redirect to='/list'/>;
        }

        if (redirectLogin) {
            localStorage.clear()
            return <Redirect to='/'/>;
        } 

        return (
            <Segment className="container">
               <Menu className="menu">
                    <Menu.Item
                        name='users'
                    >
                    Users
                  </Menu.Item>
                    <Menu.Item
                        name='list'
                        active={activeItem === 'list'}
                        onClick={this.clickList}
                    >
                    Lista
                  </Menu.Item>
                  <Menu.Item
                        name='newUser'
                        active={activeItem === 'newUser'}
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
            <Form className="formStyle" onSubmit={this.submitForm}>

                <Segment className="segText">
                    <label className="textForm">Nome:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Nome" value={this.state.data.nome} onChange={this.changeName} required />

                <Segment className="segText">
                    <label className="textForm">CPF:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="CPF" value={this.state.data.cpf} onChange={this.changeCpf} required />
                
                <Segment className="segText">
                    <label className="textForm">Email:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Email" value={this.state.data.email} onChange={this.changeEmail} required />
                
                <Segment className="segText">
                    <label className="textForm">CEP:</label>
                </Segment>

                <Input className="inputStyle" type="number">
                    <InputMask placeholder="00000-000" minLength="8" maxLength="8" value={this.state.data.endereco.cep} onBlur={this.onBlurCep} onChange={this.changeCep} required /> 
                </Input>

                <Segment className="segText">
                    <label className="textForm">Rua:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Rua" value={this.state.data.endereco.rua} onChange={this.changeStreet} required />

                <Segment className="segText">
                    <label className="textForm">Número:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="Número" value={this.state.data.endereco.numero} onChange={this.changeNumber} required />

                <Segment className="segText">
                    <label className="textForm">Bairro:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Bairro" value={this.state.data.endereco.bairro} onChange={this.changeDistrict} required />

                <Segment className="segText">
                    <label className="textForm">Cidade:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Cidade" value={this.state.data.endereco.cidade} onChange={this.changeCity} required />

                <Segment className="segButton">
                    <Button type="submit" className="buttonStyle">Inserir</Button>
                </Segment>
            
            </Form>
        </Segment>
        )
    }
}

export default NewUser;