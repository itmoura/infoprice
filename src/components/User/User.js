import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Table, Form, Button } from 'react-bootstrap';

import Menu from '../Menu';

import Api from '../../api';

class User extends Component {

    state = {
        users: [],
        address: [],
    }

    async componentDidMount() {
        const userId = localStorage.getItem('userId');
        const response = await Api.get('/user/' + userId);

        this.setState({ users: response.data });

        const response2 = await Api.get('/address');

        (response2.data).forEach(address => {
            if (address.userId.id == userId) {
                this.setState({ address: response2.data });
            }
        });
    }

    render() {

        const { users } = this.state;
        const { address } = this.state;

        const userId = localStorage.getItem('userId');
        const addressId = localStorage.getItem('addressId');

        return (
            <div className="user-container">
                <Menu />

                <div id="content">
                    <Container>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome" name="name" value={users.name} disabled />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="E-mail" name="email" value={users.email} disabled />
                            </Form.Group>

                            <Form.Group controlId="formBasicCpf">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control type="text" placeholder="CPF" name="cpf" value={users.cpf} disabled />
                            </Form.Group>
                        </Form>

                        <div className="d-flex justify-content-end marginBottom">
                            <Link to={'/address-create'} onClick={() => {
                                localStorage.setItem('userId', userId)
                            }}>
                                <Button>
                                    Cadastrar Endereço
								</Button>
                            </Link>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CEP</th>
                                    <th>Rua</th>
                                    <th>Número</th>
                                    <th>Cidade</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {address.map(address => (
                                    <tr key={address.id}>
                                        <td>{address.id}</td>
                                        <td>{address.cep}</td>
                                        <td>{address.placePublic}</td>
                                        <td>{address.number}</td>
                                        <td>{address.cityId.name}</td>
                                        <td>
                                            <Link to={'/address-edit/' + address.id} onClick={() => {
                                                localStorage.setItem('addresId', address.id)
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Link> / &nbsp;
                                            <a onClick={() => {
                                                Api.delete(`/address/${address.id}`).then(res => {
                                                    window.location.reload(true);
                                                }).catch(err => {

                                                })

                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>

                </div>
            </div >
        );
    }
}

export default User;
