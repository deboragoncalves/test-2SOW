import React, { Component } from "react";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

import InputMask from 'react-input-mask'

import { Redirect } from "react-router-dom";

import { Menu } from 'semantic-ui-react'

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

    clickList = (e, { name }) => {
        this.setState({ activeItem: name, redirectList: true })
      }
  
    clickLogout = (e, { name }) => {
        this.setState({ activeItem: name, redirectLogin: true })
    }

    changeName = e => {
        this.setState({ data: { nome: e.target.value }})
    }

    changeCpf = e => {
        this.setState({ data: { cpf: e.target.value }})
    }

    changeEmail = e => {
        this.setState({ data: { email: e.target.value }})
    }

    changeCep = e => {
        this.setState({ data: { endereco: { cep: e.target.value }} })
    }

    changeStreet = e => {
        this.setState({ data: { endereco: { rua: e.target.value }} })

    }

    changeNumber = e => {
        this.setState({ data: { endereco: { numero: e.target.value }} })
    }

    changeDistrict = e => {
        this.setState({ data: { endereco: { bairro: e.target.value }} })
    }

    changeCity = e => {
        this.setState({ data: { endereco: { cidade: e.target.value }} })
    }

    onBlurCep = e => {
        
        // Validar CEP

        if (e.target.value?.length !== 8) {
            return;
        } else {

        this.setState({ data: { endereco: { cep: e.target.value }} })

            // Autocomplete CEP - ViaCep quando sair do input

            axios.get('https://viacep.com.br/ws/' + e.target.value + '/json/')
                .then(res => {

                    // Setar state de acordo com os dados do json (viacep)

                    this.setState({ data: { endereco: { 
                        rua: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.localidade
                    }} })
        
                })
                .catch(error => { console.log(error)} )
                }
    }

    validateForm = () => {

        // Cast para int e atribuir valor ao id

        var idInteger = parseInt(this.state.data.id)
        idInteger = Math.random()

        this.setState({ data: { id: idInteger } })

        // Cast para int e setar state

        var cepInteger = parseInt(this.state.data.endereco.cep)
        var numInteger = parseInt(this.state.data.endereco.numero)

        this.setState({ data: { endereco: { cep: cepInteger, numero: numInteger } }})

        // Validação

        if (!this.state.data.email.includes("@") || !this.state.data.email.includes(".com")) {
            toast.warning(<ToastEmail />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (this.state.data.id.length === 0) {
            return false;
        }

        return true;
    }

    submitForm = e => {
        e.preventDefault()
        e.persist();

        const isValid = this.validateForm();

        if (isValid) {

            // Adicionar informações, fazendo o post e passando o state

            axios.post("http://localhost:5000/usuarios", this.state.data)
                .then(res => console.log(res))
                .catch(error => { console.log(error) })

            // Limpar formulário

            this.setState({
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
                
            })
        }  
    }

    render() {
        const { activeItem } = this.state

        const { redirectList } = this.state;
        const { redirectLogin } = this.state;

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