import React, { Component } from "react";
import { Form, Input, Button, Segment } from "semantic-ui-react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

import InputMask from 'react-input-mask'

const ToastEmail = () => {
    return (
        <div>O campo "Email" deve estar em formato de Email (@, .com).</div>
    )
}

const ToastCep = () => {
    return (
        <div>O campo "CEP" deve ter 8 números.</div>
    )
}

class NewUser extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
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

    onBlurCep = e => {
        
        // Validar CEP

        if (e.target.value?.length !== 8) {
            return;
        } else {

            this.setState({ cep: e.target.value })

            // Autocomplete CEP - ViaCep quando sair do input

            axios.get('https://viacep.com.br/ws/' + e.target.value + '/json/')
                .then(res => {

                    // Setar state de acordo com os dados do json (viacep)

                    this.setState({ 
                        street: res.data.logradouro,
                        district: res.data.bairro,
                        city: res.data.localidade 
                    })
        
                })
                .catch(error => { console.log(error)} )
                }
    }

    validateForm = () => {

        this.setState({ id: Math.random() })

        /* Se não for válido, exibir warning e retornar false */

        if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
            toast.warning(<ToastEmail />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (!this.state.cep.length === 8) {
            toast.warning(<ToastCep />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (!this.state.id) {
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

            axios.post("/usuarios", this.state)
                .then(res => console.log(res))
                .catch(error => { console.log(error) })

            // Limpar formulário

            this.setState({
                id: '',
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

                <Input className="inputStyle" type="number">
                    <InputMask placeholder="00000-000" minLength="8" maxLength="8" onBlur={this.onBlurCep} onChange={this.changeCep} required /> 
                </Input>

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

export default NewUser;