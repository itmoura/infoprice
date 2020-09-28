import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Container, Table, Alert } from 'react-bootstrap';

import Menu from '../Menu';

import Api from '../../api';

import '../../assets/css/screens.css'

class Index extends Component {

	state = {
		users: [],
		show: true
	}

	async componentDidMount() {
		const response = await Api.get('/user');

		this.setState({ users: response.data });
	}

	render() {

		const { users, show } = this.state;
		localStorage.setItem('userId', null);

		return (
			<div className="user-container">
				<Menu />

				<div id="content">
					<Container>
						{!show ?
							<div className="alertDiv">
								<Alert variant="danger" onClose={() => this.setState({ show: !show })} dismissible>
									<Alert.Heading>Erro ao Deletar</Alert.Heading>
									<p>
										Possui endereço cadastrados, para apagar registro é preciso deletar seus endereços
									</p>
								</Alert>
							</div>

							:
							<div></div>
						}
						<div className="d-flex justify-content-end marginBottom">
							<Link to={'/create'}>
								<Button>
									Cadastrar
								</Button>
							</Link>
						</div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>E-mail</th>
									<th>CPF</th>
									<th>Ação</th>
								</tr>
							</thead>
							<tbody>
								{users.map(user => (
									<tr key={user.id}>
										<td>{user.id}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.cpf}</td>
										<td>
											<Link to={'/user/' + user.id} onClick={() => {
												localStorage.setItem('userId', user.id)
											}}>
												<svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z" />
													<path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
												</svg>
											</Link> / &nbsp;
											<Link to={'/user-edit/' + user.id} onClick={() => {
												localStorage.setItem('userId', user.id)
											}}>
												<svg width="20" height="20" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
													<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
													<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
												</svg>
											</Link> / &nbsp;
											<a onClick={() => {
												Api.delete(`/user/${user.id}`).then(res => {
													window.location.reload(true);
												}).catch(err => {
													this.setState({ show: !show });
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

export default Index;
