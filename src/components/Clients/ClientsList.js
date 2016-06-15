import React, {Component, PropTypes} from 'react';
import ClientShortInfo from './ClientShortInfo';


export default class ClientsList extends Component {
  static propTypes = {
    clients: PropTypes.array.isRequired,

    choose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.clients.map((client, index) => {
          return (<ClientShortInfo client={client} index={index} choose={this.props.choose} />);
        })}
      </div>
    );
  }
}
