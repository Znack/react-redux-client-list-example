import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as clientsModule from 'redux/modules/clients';
import { asyncConnect } from 'redux-async-connect';
import { SearchForm } from 'components';
import { ClientsList } from 'components';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!clientsModule.getIsLoadedFlag(getState())) {
      return dispatch(clientsModule.load());
    }
  }
}])
@connect(
  state => ({
    ...state.clients,
    clients: clientsModule.getFilteredClients(state),
  }),
  clientsModule)
export default class Clients extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,

    search: PropTypes.func.isRequired,
    choose: PropTypes.func.isRequired,
  };

  render() {
    const {clients, searchQuery, search} = this.props;
    // const styles = require('./Clients.scss');
    return (
      <div className="container">
        <h1>
          Clients Page
        </h1>
        <Helmet title="Clients"/>

        <div className="left-sidebar">
          <SearchForm
            query={searchQuery}
            search={search}
          />

          <ClientsList
            clients={clients}
          />
        </div>

      </div>
    );
  }
}

