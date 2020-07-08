import React, { Component } from 'react';

export class ExibeSistema extends Component {
    static displayName = ExibeSistema.name;

    constructor(props) {
        super(props);
        this.state = { sistemas: [], loading: true };
    }

    componentDidMount() {
        this.populateSistemaData();
    }

    static renderSistemasTable(sistemas) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Descricao</th>
                    </tr>
                </thead>
                <tbody>
                    {sistemas.map(sistemas =>
                        <tr key={sistemas.id}>
                            <td>{sistemas.descricao}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ExibeSistema.renderSistemasTable(this.state.sistemas);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}                
            </div>
        );
    }

    async populateSistemaData() {
        const response = await fetch('api/Sistemas');
        const data = await response.json();
        this.setState({ sistemas: data, loading: false });
    }
}
