import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, Segment } from "semantic-ui-react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

/* Objeto estado inicial */

const InitialState = {
    username: "",
    password: ""
}

/* Customizar Toast. Inicial maiúscula. */

const ToastPassword = () => {
    return (
        <div>A senha deve ter, no mínimo, 5 caracteres.</div>
    )
}

const ToastUsername = () => {
    return (
        <div>O campo "Usuário" está incorreto e deve estar em formato de Email (@, .com).</div>
    )
}


class LoginPage extends Component {
    constructor() {
        super()
        this.state = InitialState
    }

    /* Métodos:
    Prevent Default: direcionar submit ao método criado */

    changeUsername = e => {
        this.setState({ username: e.target.value })
    }

    changePassword = e => {
        this.setState({ password: e.target.value })
    }

    validateForm = () => {

        /* Se não for válido, setar valor do state, exibir warning e retornar false */

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
        const isValid = this.validateForm();

        if (isValid) {
            // Limpar formulário

            this.setState(InitialState);

            // Ir para listas
        }

        // 
        

        e.preventDefault()
    }

    /* Dentro de segments, é possível aplicar flexbox. */

    render() {
        return (
        <Segment className="container">
            <Form className="formStyle" onSubmit={this.submitForm}>

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

export default LoginPage;