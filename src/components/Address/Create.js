import React, { Component } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';

import Menu from '../Menu';

import Api from '../../api';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cep: '',
            placePublic: '',
            complement: '',
            neighborhood: '',
            number: '',
            cityId: 1,
            userId: 1,
            id: 0,
            cityVal: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {

        const userId = localStorage.getItem('userId');
        let addressId = this.props.match.params.id;

        if (addressId) {
            const cityId = Number(this.state.cityId)
            Api.put(`/address/${this.state.id}`, {
                id: this.state.id,
                cep: this.state.cep,
                placePublic: this.state.placePublic,
                complement: this.state.complement,
                neighborhood: this.state.neighborhood,
                number: this.state.number,
                cityId: cityId,
                userId: this.state.userId
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            event.preventDefault();

            this.props.history.push('/user/' + userId);
        } else {
            const cityId = Number(this.state.cityId)
            const id = Number(userId)

            console.log(id)
            console.log(cityId)
            
            Api.post('/address', {
                cep: this.state.cep,
                placePublic: this.state.placePublic,
                complement: this.state.complement,
                neighborhood: this.state.neighborhood,
                number: this.state.number,
                cityId: cityId,
                userId: id
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            event.preventDefault();

            this.props.history.push('/user/' + userId);
        }
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId');
        let addressId = this.props.match.params.id;

        if (addressId) {
            const response = await Api.get(`/address/${addressId}`);

            this.setState({ id: response.data.id });
            this.setState({ cep: response.data.cep });
            this.setState({ placePublic: response.data.placePublic });
            this.setState({ complement: response.data.complement });
            this.setState({ neighborhood: response.data.neighborhood });
            this.setState({ number: response.data.number });
            this.setState({ cityId: response.data.cityId.id });
            this.setState({ userId: response.data.userId.id });
        }

        const response2 = await Api.get(`/city`);

        this.setState({ cityVal: response2.data })

    }

    render() {

        const { cityVal } = this.state;

        const userId = localStorage.getItem('userId');
        const addressId = localStorage.getItem('addressId');

        return (
            <div className="user-container">
                <Menu />

                <div id="content">
                    <Container>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Control type="hidden" placeholder="id" name="id" value={this.state.id} onChange={this.handleChange} />
                            <Form.Control type="hidden" placeholder="id" name="userId" value={this.state.userId} onChange={this.handleChange} />
                            <Form.Group controlId="formBasicName">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control type="text" placeholder="CEP" name="cep" value={this.state.cep} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPlace">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control type="text" placeholder="Rua" name="placePublic" value={this.state.placePublic} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicNumber">
                                <Form.Label>Número</Form.Label>
                                <Form.Control type="text" placeholder="Número" name="number" value={this.state.number} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicNei">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" placeholder="Bairro" name="neighborhood" value={this.state.neighborhood} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control as="select" name="cityId" value={this.state.cityId} onChange={this.handleChange}>
                                    {cityVal.map(city => (
                                        <option value={city.id}>{city.name}</option>
                                    ))}
                                </Form.Control>
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
