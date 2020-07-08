import React, { Component } from 'react';

import { Jumbotron, Button, Col, Grid, Card, FormGroup, InputGroup, FormControl, Form } from 'react-bootstrap'
import custom from './../custom';

import { Link } from 'react-router-dom';

const User = () => {
    return <p>User</p>
}

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            sistemas: [],
            descricao: '',
            sigla: '',
            email: '',
            users: this.renderSistemasTable,
            pager: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchSistemaData = this.searchSistemaData.bind(this);
        this.handleEdit = this.handleEdit.bind(this);  

    }

    renderSistemasTable = (state) => {
        const { pager, sistemas } = state;
        if (sistemas && sistemas.length) {
            return (
                <div>
                    <div className="card-body">
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th>Descricao</th>
                                    <th>Sigla</th>
                                    <th>E-mail de atendimento</th>
                                    <th>URL</th>
                                    <th>Status</th>
                                    <th>A&#231;&#245;es</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sistemas.map(sistemas =>
                                    <tr key={sistemas.sistemaId}>
                                        <td>{sistemas.descricao}</td>
                                        <td>{sistemas.sigla}</td>
                                        <td>{sistemas.email}</td>
                                        <td>{sistemas.url}</td>
                                        <td>{sistemas.status ? 'Ativo' : 'Cancelado'}</td>                                    
                                        <td>
                                            <a className="action" onClick={(id) => this.handleEdit(sistemas.sistemaId)}>Editar</a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {pager.pages && pager.pages.length && pager.totalPages > 1 &&
                        <div className="card-footer pb-0 pt-3" center>

                            <ul className="pagination">
                                <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=1` }} className="page-link">Primeira</Link>
                                </li>
                                <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Anterior</Link>
                                </li>
                                {pager.pages.map(page =>
                                    <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                        <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                    </li>
                                )}
                                <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Pr&#243;xima</Link>
                                </li>
                                <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                    <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">&#218;ltima</Link>
                                </li>
                            </ul>

                        </div>}
                </div>
            )
        } else {            
            return (<div><p>N&#227;o h&#225; resultados a serem exibidos.</p></div>);
        }
    }

    async limparSistemaData() {
        this.setState({
            users: this.renderSistemasTable([])
        })
    }

    async searchSistemaData() {
        const paramsA = new URLSearchParams(window.location.search);
        var params = {
            descricao: "",
            sigla: "",
            email: "",
            page: (paramsA.get('page')) || 1
        };

        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        //const response = await fetch('api/Sistemas/page?' + query);
        //const data = await response.json();
        console.log(`/api/Sistemas/page?${query}`);
        if (params.page !== this.state.pager.currentPage) {
            fetch(`/api/Sistemas/page?${query}`, { method: 'GET' }).then(
                response => response.json()
            ).then(({ pager, sistemas }) => {
                this.setState({ pager, sistemas });
            });
        }
        this.setState({
            users: this.renderSistemasTable(this.state)
        })
    }

    componentDidMount() {
        //this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }

    async loadPage() {
        // get page of items from api
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
            fetch(`/api/Sistemas/page?page=${page}`, { method: 'GET' }).then(
                response => response.json()
            ).then(({ pager, sistemas }) => {
                this.setState({ pager, sistemas });
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        //console.log(this.state.descricao);
    }


    handleEdit(id) {
        this.props.history.push("/employee/edit/" + id);
    }  

    handleSearch(event) {
        //this.populateSistemaData();
    }

    componentDidUpdate() {
        //this.populateSistemaData();
    }



    addUser = () => {
        this.setState({
            users: this.renderSistemasTable()
        })
    }
    render() {
        return (
            <div className="container">
                <Card>
                    <Card.Header>Pesquisar Sistema</Card.Header>
                    <Card.Body>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Descri&#231;&#227;o</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input className="form-control" type="text" onChange={this.handleChange} name="descricao" />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Sigla</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input className="form-control" type="text" onChange={this.handleChange} name="sigla" />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">E-mail de atendimento do Sistema</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input className="form-control" type="text" onChange={this.handleChange} name="email" />
                        </InputGroup>
                    </Card.Body>

                    <Card.Body>
                        <div>
                            {this.state.users}                            
                        </div>
                    </Card.Body>
                    <Card.Footer style={custom.right}>
                        <Button variant="primary" onClick={this.searchSistemaData} style={custom.button}>Pesquisar</Button>
                        <Button variant="primary" style={custom.button}>Limpar</Button>
                        <Button variant="primary" style={custom.button}>Novo Sistema</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
