import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class SistemasPagination extends Component {
    //static displayName = SistemasPagination.name;

    constructor(props) {
        super(props);
        this.state = {
            pager: {},
            sistemas: []
        };

    }

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }

    async loadPage() {
        // get page of items from api
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
            //fetch(`/api/Sistemas/page?page=${page}`, { method: 'GET' })
            //    .then(
            //        response => response.json()
            //    )
            //    .then(({ pager, pageOfItems }) => {
            //        this.setState({ pager, pageOfItems });
            //        var a = 3;
            //        console.log(pager);
            //    });
            fetch(`/api/Sistemas/page?page=${page}`, { method: 'GET' }).then(
                response => response.json()
            ).then(({ pager, sistemas }) => {
                //console.log(pager);
                //console.log(sistemas);
                this.setState({ pager, sistemas });
             });
        }
        const { pager, sistemas } = this.state;
        console.log(sistemas);
    }

    render() {
        const { pager, sistemas } = this.state;
        return (
            <div className="card text-center m-3">
                <h3 className="card-header">React + Node - Server Side Pagination Example</h3>
                <div className="card-body">
                    {sistemas.map(sistemas =>
                        <div key={sistemas.sistemaId}>{sistemas.descricao}</div>
                    )}
                </div>
                <div className="card-footer pb-0 pt-3">
                    {pager.pages && pager.pages.length && pager.totalPages > 1 &&
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
                            <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">&#250;ltima</Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        );
    }

}

//export default {SistemasPagination};