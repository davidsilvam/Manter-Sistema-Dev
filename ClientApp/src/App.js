import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { ExibeSistema } from './components/ExibeSistema';
import { ExibePagination } from './components/ExibePagination';
import { SistemasPagination } from './components/SistemasPagination';

import './custom.css'

export default class App extends Component  {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/exibe-sistema' component={ExibeSistema} />
            <Route path='/exibe-pagination' component={ExibePagination} />
      </Layout>
    );
  }
}
