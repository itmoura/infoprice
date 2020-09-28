import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import InputMask from 'react-input-mask';

import { Container, Form, Button } from 'react-bootstrap';

import Menu from '../Menu';

import Api from '../../api';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            cpf: '',
            id: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {

        if(this.state.id != 0){
            Api.put(`/user/${this.state.id}`, {
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                cpf: this.state.cpf
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
    
            event.preventDefault();
    
            this.props.history.push('/');
        } else {
            Api.post('/user', {
                name: this.state.name,
                email: this.state.email,
                cpf: this.state.cpf
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
    
            event.preventDefault();
    
            this.props.history.push('/');   
        }
    }

    async componentDidMount() {
        let userId = this.props.match.params.id;

        if(userId){
            const response = await Api.get('/user/' + userId);

            this.setState({ id: response.data.id });
            this.setState({ name: response.data.name });
            this.setState({ email: response.data.email });
            this.setState({ cpf: response.data.cpf });
        }
        
    }

    render() {

        let userId = this.props.match.params.id;        

        return (
            <div className="user-container">
                <Menu />

                <div id="content">
                    <Container>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Control type="hidden" placeholder="id" name="id" value={this.state.id} onChange={this.handleChange} />
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" name="name" value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="E-mail" name="email" value={this.state.email} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicCpf">
                                <Form.Label>CPF</Form.Label>
                                <InputMask class="form-control" name="cpf" {...this.props} mask="999.999.999-99" value={this.state.cpf} onChange={this.handleChange} >

                                </InputMask>
                                {/* <Form.Control type="text" placeholder="CPF" name="cpf" value={this.state.cpf} onChange={this.handleChange} /> */}
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Finalizar
                            </Button>
                        </Form>
                    </Container>

                </div>
            </div >
        );
    }
}

export default User;
