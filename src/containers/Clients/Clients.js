import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as clientsModule from 'redux/modules/clients';
import { asyncConnect } from 'redux-async-connect';
import { SearchForm } from 'components';
import { ClientsList } from 'components';
import { ClientDetails } from 'components';

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
    chosen: PropTypes.number.isRequired,

    search: PropTypes.func.isRequired,
    choose: PropTypes.func.isRequired,
  };

  render() {
    const {clients, searchQuery, search, choose} = this.props;
    const styles = require('./Clients.scss');
    return (
      <div className={styles.container + ' container clearfix'}>
        <Helmet title="Clients"/>

        <div className={styles.leftSidebar}>
          <SearchForm
            query={searchQuery}
            search={search}
          />

          <ClientsList
            clients={clients}
            choose={choose}
          />
        </div>

        <div className={styles.mainContent}>
          {this.props.chosen < 0 && this.props.clients.length > this.props.chosen ?
            '' : <ClientDetails client={this.props.clients[this.props.chosen]} />
          }
        </div>

      </div>
    );
  }
}

