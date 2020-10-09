import React, { Component } from "react";
import "./login.css";
import { Form, Input, Button, Segment } from "semantic-ui-react";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }

    changeUsername = e => {
        this.setState({ username: e.target.value })
    }

    changePassword = e => {
        this.setState({ password: e.target.value })
    }

    submitForm = e => {
        if (this.state.password.length <= 4) {
            alert("A senha deve ter mais do que 4 caracteres.")
            console.log("Senha: " + this.state.password)
        }

        e.preventDefault()
    }

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

export default Login;