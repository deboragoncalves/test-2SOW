import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { Redirect } from "react-router-dom";

import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

/* Customizar Toast. Inicial maiúscula. */

const ToastPassword = () => {
    return (
        <div>A senha deve ter, no mínimo, 5 caracteres.</div>
    )
}

const ToastUsername = () => {
    return (
        <div>O campo "Usuário" deve estar em formato de Email (@, .com).</div>
    )
}

const ToastName = () => {
    return (
        <div>O nome deve ter, no mínimo, 3 caracteres</div>
    )
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            username: '',
            password: '',
            redirect: false
        }
    }

    /* Métodos:
    Prevent Default: direcionar submit ao método criado */

    changeName = e => {
        this.setState({ name: e.target.value })
    }

    changeUsername = e => {
        this.setState({ username: e.target.value })
    }

    changePassword = e => {
        this.setState({ password: e.target.value })
    }

    validateForm = () => {

        /* Se não for válido, exibir warning e retornar false */

        if (this.state.name.length < 3) {
            toast.warning(<ToastName />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (this.state.password.length < 5) {
            toast.warning(<ToastPassword />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        } 
        
        if (!this.state.username.includes("@") || !this.state.username.includes(".com")) {
            toast.warning(<ToastUsername />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        return true;
    }

    submitForm = e => {
        e.preventDefault()
        e.persist();

        const isValid = this.validateForm();

        if (isValid) {
            // Limpar formulário

            this.setState({
                name: '',
                username: '',
                password: ''
            })

            // Pegar valor input Nome, guardar id/token no localStorage e redirect para true (lista)

            const name = e.target.elements.name.value

            axios.get('https://api.github.com/users/' + name)
                .then(res => {
                    localStorage.setItem('token', res.data.node_id);

                    // Setar redirect

                    this.setState({ redirect: true })
                })
                .catch(error => { console.log("Error: " + error)})
        }  
    }

    /* Dentro de segments, é possível aplicar flexbox. */

    render() {
        const { redirect } = this.state;

        // Se for redirect true ou se já tiver token, direcionar para lista

        if (redirect || localStorage.getItem('token')) {
            return <Redirect to='/list'/>;
        } 

        return (
        <Segment className="container">
            <Form className="formStyle" onSubmit={this.submitForm}>

                <Segment className="segText">
                    <label className="textForm">Nome:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Nome" value={this.state.name} name="name" onChange={this.changeName} />

                <Segment className="segText">
                    <label className="textForm">Usuário:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Usuário" value={this.state.username} onChange={this.changeUsername} />
                
                <Segment className="segText">
                    <label className="textForm">Senha:</label>
                </Segment>

                <Input className="inputStyle" type="password" placeholder="Senha" value={this.state.password} onChange={this.changePassword} />
                
                <Segment className="segButton">
                    <Button type="submit" className="buttonStyle">Entrar</Button>
                </Segment>
            
            </Form>
        </Segment>
        )
    }
}

export default Login;