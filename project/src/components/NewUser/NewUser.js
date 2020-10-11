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

class NewUser extends Component {
    constructor() {
        super()
        this.state = {
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

    changeName = e => {
        this.setState({ nome: e.target.value })
    }

    changeCpf = e => {
        this.setState({ cpf: e.target.value })
    }

    changeEmail = e => {
        this.setState({ email: e.target.value })
    }

    changeCep = e => {
        var endereco = {...this.state.endereco}
        endereco.cep = e.target.value;
        this.setState({ endereco })
    }

    changeStreet = e => {
        var endereco = {...this.state.endereco}
        endereco.rua = e.target.value;
        this.setState({ endereco })
    }

    changeNumber = e => {
        var endereco = {...this.state.endereco}
        endereco.numero = e.target.value;
        this.setState({ endereco })
    }

    changeDistrict = e => {
        var endereco = {...this.state.endereco}
        endereco.bairro = e.target.value;
        this.setState({ endereco })
    }

    changeCity = e => {
        var endereco = {...this.state.endereco}
        endereco.cidade = e.target.value;
        this.setState({ endereco })
    }

    onBlurCep = e => {
        
        // Validar CEP

        if (e.target.value?.length !== 8) {
            return;
        } else {

            var endereco = {...this.state.endereco}
            endereco.cep = e.target.value;
            this.setState({ endereco })

            // Autocomplete CEP - ViaCep quando sair do input

            axios.get('https://viacep.com.br/ws/' + e.target.value + '/json/')
                .then(res => {

                    // Setar state de acordo com os dados do json (viacep)

                    var endereco = {...this.state.endereco}
                    endereco.rua = res.data.logradouro;
                    endereco.bairro = res.data.bairro;
                    endereco.cidade = res.data.localidade;

                    this.setState({ endereco })
        
                })
                .catch(error => { console.log(error)} )
                }
    }

    validateForm = () => {

        // Cast para int e atribuir valor ao id

        var idInteger = parseInt(this.state.id)
        idInteger = Math.random()

        this.setState({ id: idInteger })

        // Cast para int e setar state

        var endereco = {...this.state.endereco}

        var cepInteger = parseInt(endereco.cep)
        var numInteger = parseInt(endereco.numero)

        endereco.cep = cepInteger;
        endereco.numero = numInteger;
        this.setState({ endereco })

        // Validação

        if (!this.state.email.includes("@") || !this.state.email.includes(".com")) {
            toast.warning(<ToastEmail />, {position: toast.POSITION.TOP_LEFT, autoClose: false})
            return false;
        }

        if (this.state.id.length === 0) {
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

                <Input className="inputStyle" type="text" placeholder="Nome" value={this.state.nome} onChange={this.changeName} required />

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
                    <InputMask placeholder="00000-000" minLength="8" maxLength="8" value={this.state.endereco.cep} onBlur={this.onBlurCep} onChange={this.changeCep} required /> 
                </Input>

                <Segment className="segText">
                    <label className="textForm">Rua:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Rua" value={this.state.endereco.rua} onChange={this.changeStreet} required />

                <Segment className="segText">
                    <label className="textForm">Número:</label>
                </Segment>

                <Input className="inputStyle" type="number" placeholder="Número" value={this.state.endereco.numero} onChange={this.changeNumber} required />

                <Segment className="segText">
                    <label className="textForm">Bairro:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Bairro" value={this.state.endereco.bairro} onChange={this.changeDistrict} required />

                <Segment className="segText">
                    <label className="textForm">Cidade:</label>
                </Segment>

                <Input className="inputStyle" type="text" placeholder="Cidade" value={this.state.endereco.cidade} onChange={this.changeCity} required />

                <Segment className="segButton">
                    <Button type="submit" className="buttonStyle">Inserir</Button>
                </Segment>
            
            </Form>
        </Segment>
        )
    }
}

export default NewUser;