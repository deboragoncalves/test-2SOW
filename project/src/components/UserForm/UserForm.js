import React, { Component } from "react";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastEmail = () => {
    return (
        <div>O campo "Email" deve estar em formato de Email (@, .com).</div>
    )
}

class UserForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            cpf: '',
            email: '',
            cep: '',
            street: '',
            number: '',
            district: '',
            city: ''
        }
    }

    changeName = e => {
        this.setState({ name: e.target.value })
    }

    changeCpf = e => {
        this.setState({ cpf: e.target.value })
    }

    changeEmail = e => {
        this.setState({ email: e.target.value })
    }

    changeCep = e => {
        this.setState({ cep: e.target.value })
    }

    changeStreet = e => {
        this.setState({ street: e.target.value })
    }

    changeNumber = e => {
        this.setState({ number: e.target.value })
    }

    changeDistrict = e => {
        this.setState({ district: e.target.value })
    }

    changeCity = e => {
        this.setState({ city: e.target.value })
    }

    validateForm = () => {

        /* Se não for válido, exibir warning e retornar false */

        if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
            toast.warning(<ToastEmail />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
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
                cpf: '',
                email: '',
                cep: '',
                street: '',
                number: '',
                district: '',
                city: ''
            })

        }  
    }

    render() {
        return (
            <Segment className="container">
            <Form className="formStyle" onSubmit={this.submitForm}>

                <Segment className="segText">
                    <label className="textForm">Nome:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Nome" value={this.state.name} onChange={this.changeName} required />

                <Segment className="segText">
                    <label className="textForm">CPF:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="CPF" value={this.state.cpf} onChange={this.changeCpf} required />
                
                <Segment className="segText">
                    <label className="textForm">Email:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Email" value={this.state.email} onChange={this.changeEmail} required />
                
                <Segment className="segText">
                    <label className="textForm">CEP:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="CEP" value={this.state.cep} onChange={this.changeCep} required />

                <Segment className="segText">
                    <label className="textForm">Rua:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Rua" value={this.state.street} onChange={this.changeStreet} required />

                <Segment className="segText">
                    <label className="textForm">Número:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="Número" value={this.state.number} onChange={this.changeNumber} required />

                <Segment className="segText">
                    <label className="textForm">Bairro:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Bairro" value={this.state.district} onChange={this.changeDistrict} required />

                <Segment className="segText">
                    <label className="textForm">Cidade:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Cidade" value={this.state.city} onChange={this.changeCity} required />

                <Segment className="segButton">
                    <Button type="submit" className="buttonStyle">Inserir</Button>
                </Segment>
            
            </Form>
        </Segment>
        )
    }
}

export default UserForm;