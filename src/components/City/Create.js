import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';

import Menu from '../Menu';

import Api from '../../api';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ibge: '',
            uf: '',
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
            Api.put(`/city/${this.state.id}`, {
                id: this.state.id,
                name: this.state.name,
                ibge: this.state.ibge,
                uf: this.state.uf
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
    
            event.preventDefault();
    
            this.props.history.push('/city');
        } else {
            Api.post('/city', {
                name: this.state.name,
                ibge: this.state.ibge,
                uf: this.state.uf
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
    
            event.preventDefault();
    
            this.props.history.push('/city');   
        }
    }

    async componentDidMount() {
        let cityId = this.props.match.params.id;

        if(cityId){
            const response = await Api.get('/city/' + cityId);

            this.setState({ id: response.data.id });
            this.setState({ name: response.data.name });
            this.setState({ ibge: response.data.ibge });
            this.setState({ uf: response.data.uf });
        }
        
    }

    render() {

        const userId = localStorage.getItem('userId');

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

                            <Form.Group controlId="formBasicIbge">
                                <Form.Label>IBGE</Form.Label>
                                <Form.Control type="text" placeholder="IBGE" name="ibge" value={this.state.ibge} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUf">
                                <Form.Label>UF</Form.Label>
                                <Form.Control type="text" placeholder="UF" name="uf" value={this.state.uf} onChange={this.handleChange} />
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
