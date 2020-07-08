import React, { Component } from 'react';

//import { Link } from 'react-router-dom';

import SistemasPagination from './SistemasPagination.js';  

export class ExibePagination extends Component {
    static displayName = ExibePagination.name;

    render() {
        //let contents = this.state.loading
        //    ? <p><em>Loading...</em></p>
        //    : <SistemasPagination />

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                <SistemasPagination />
            </div>
        );
    }
 
}
