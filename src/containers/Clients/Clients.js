import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as clientsModule from 'redux/modules/clients';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (getState().clients.loaded) {
      return dispatch(clientsModule.load());
    }
  }
}])
@connect(
  state => (state.clients),
  clientsModule)
export default class Widgets extends Component {
  static propTypes = {
    clients: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,

    load: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    choose: PropTypes.func.isRequired,
  };

  render() {
    //const handleEdit = (widget) => {
    //  const {editStart} = this.props; // eslint-disable-line no-shadow
    //  return () => editStart(String(widget.id));
    //};
    const {clients, error, loading} = this.props;
    const styles = require('./Clients.scss');
    return (
      <div>
        <h1>
          Clients Page
        </h1>
        <Helmet title="Clients"/>
      </div>
    );
  }
}

